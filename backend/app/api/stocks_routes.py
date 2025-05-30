from flask import Blueprint, jsonify, request, json
from flask_login import login_required, current_user
from app.models import db, User, Watchlist, Stock, Transaction
from app.forms import  StocksSearchForm, HistoricalDataForm
# from app.utils import companyInfo, keyStatistics
from sqlalchemy import or_
# import yfinance as yf
# from yahoo_fin import stock_info as si
# from bs4 import BeautifulSoup, SoupStrainer
import threading
# import requests
from datetime import datetime, timedelta

stocks_routes = Blueprint('stocks', __name__)


## GET stock info

@stocks_routes.route('/<stock_symbol>')
@login_required
def get_stock_info(stock_symbol):
    symbol = stock_symbol.upper()
    session = requests.Session()
    headers = {'User-Agent': 'Mozilla/5.0'}

    stock = Stock.query.filter(Stock.stock_symbol == symbol).first()

    x = threading.Thread(target=keyStatistics, args=(symbol, session))
    x.start()
    company_info_dict = companyInfo(symbol, session, headers)

    formatted_res = {
        'id': stock.id,
        'stockDescription': company_info_dict.get("stockDescription", '_') or '_',
        'employees': company_info_dict.get("employees", '_') or '_',
        'headquarters': company_info_dict.get("headquarters", '_') or '_',
        'Sector': company_info_dict.get("sector", '_') or '_',
        'marketCap': company_info_dict.get("Market Cap", '_') or '_',
        'priceEarningsRatio': company_info_dict.get("PE Ratio (TTM)", '_'),
        'dividendYield': company_info_dict.get("Forward Dividend & Yield", '_').split(" ")[0] if company_info_dict.get("Forward Dividend & Yield") else '_',
        'averageVolume': company_info_dict.get("Avg. Volume", '_') or '_',
        'highToday': company_info_dict.get("Day's Range", '_').split(" - ")[1] if company_info_dict.get("Day's Range") else '_',
        'lowToday': company_info_dict.get("Day's Range", '_').split(" - ")[0] if company_info_dict.get("Day's Range") else '_',
        'openPrice': company_info_dict.get("Open", '_') or '_',
        'volume': company_info_dict.get("Volume", '_') or '_',
        'fiftyTwoWeekHigh': company_info_dict.get("52 Week Range", '_').split(" - ")[1] if company_info_dict.get("52 Week Range") else '_',
        'fiftyTwoWeekLow': company_info_dict.get("52 Week Range", '_').split(" - ")[0] if company_info_dict.get("52 Week Range") else '_',
    }

    return formatted_res, 200


@stocks_routes.route('/<stock_symbol>/history')
@login_required
def get_stock_history(stock_symbol):
    symbol = stock_symbol.upper()
    interval = '1d'
    period = '5d'

    try:
        data = yf.download(tickers=symbol, period=period, interval=interval)
        if data.empty:
            return jsonify({'error': 'No data found for this stock'}), 404

        close_data = data['Close'].dropna()
        chart_data = [{'timestamp': ts.isoformat(), 'price': round(price, 2)} for ts, price in close_data.items()]

        return jsonify({'symbol': symbol, 'prices': chart_data}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to fetch chart data'}), 500


@stocks_routes.route('/price/<stock_symbol>')
@login_required
def get_stock_price(stock_symbol):
    price = si.get_live_price(stock_symbol)
    return {"liveStockPrice": price}, 200


@stocks_routes.route('/prices', methods=['POST'])
@login_required
def get_stocks_prices():
    form = TickerPricesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    stocks = json.loads(form.data['stock_symbols'])
    prices = {stock: si.get_live_price(stock) for stock in stocks}
    return {"liveStockPrices": prices}, 200


@stocks_routes.route('/historical', methods=['POST'])
@login_required
def get_stocks_historical_data():
    form = HistoricalDataForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = json.loads(form.data['stocks_info'])
    stock_symbols = data.get("stock_symbols", [])
    now = datetime.now()
    new_data = {}

    if 'tickers' in data:
        tickers = data["tickers"]
        if len(tickers) == 1 or (len(tickers) == 2 and tickers[0] == tickers[1]):
            historical_data = yf.download(tickers=tickers[0], period='1wk', interval='30m')
            close_prices = historical_data['Close']
            return {tickers[0]: json.loads(close_prices.to_json())}, 200

        historical_data = yf.download(tickers=tickers, period='1wk', interval='30m', threads=True)
        close_prices = historical_data['Close']
        return close_prices.to_json(), 200

    for stock in stock_symbols:
        symbol, interval, period = stock
        if period == '1wk':
            start_date = now - timedelta(weeks=1)
        elif period == '1d':
            start_date = now - timedelta(days=1)
        elif period == '1mo':
            start_date = now - timedelta(weeks=4)
        elif period == '3mo':
            start_date = now - timedelta(weeks=12)
        elif period == '1y':
            start_date = now - timedelta(days=365)
        elif period == '5y':
            start_date = now - timedelta(days=1825)

        if period == '1d':
            historical_data = yf.download(tickers=symbol, period=period, interval=interval)
        else:
            historical_data = yf.download(tickers=symbol, start=start_date, end=now, interval=interval)

        close_prices = historical_data['Close']
        new_data[symbol] = json.loads(close_prices.to_json())

    return new_data, 200


@stocks_routes.route('/', methods=["POST"])
@login_required
def find_stocks():
    form = StocksSearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    stocks = Stock.query.filter(
        or_(
            Stock.company_name.ilike(f'%{form.data["name"]}%'),
            Stock.stock_symbol.ilike(f'{form.data["name"]}%')
        )
    ).order_by(Stock.company_name).limit(6)
    
    if stocks:
        return {'stocks': [stock.to_dict() for stock in stocks]}, 200
    return {"errors": "could not find stocks"}


@stocks_routes.route('/portfolio-chart-data/current-user')
@login_required
def user_portfolio_historical_data():
    user = current_user
    datetime_object = datetime.strptime(str(user.created_at), '%Y-%m-%d %H:%M:%S.%f')
    user_created_date_formatted = datetime_object.strftime("%Y-%m-%d")
    date_now = datetime.now()

    total_investment_data_array = []
    current_total = user.total_investment
    transactions_query = Transaction.query.filter(Transaction.owner_id == user.id).order_by(Transaction.created_at)
    transactions = [transaction.to_dict() for transaction in transactions_query]

    symbols = []
    symbolSet = set()
    for transaction in transactions:
        stock_symbol = transaction["stock_symbol"]
        if stock_symbol not in symbolSet:
            symbolSet.add(stock_symbol)
            symbols.append(stock_symbol)

    historical_data = yf.download(tickers=symbols, start=user_created_date_formatted, end=date_now, interval='1h')
    historical_prices_dict = json.loads(historical_data['Close'].to_json())
    date_points_array = list(historical_prices_dict[next(iter(historical_prices_dict))].keys())

    currently_owned_stocks = {}
    for timestamp in date_points_array:
        timestamp_dt = datetime.fromtimestamp(int(timestamp) / 1000)
        start = 0
        for i, transaction in enumerate(transactions[start:]):
            transaction_created_at = transaction["created_at"]
            transaction_type_is_buy = transaction["is_buy"]
            symbol = transaction["stock_symbol"]
            shares = transaction["current_total_stock_shares"]

            if transaction_created_at <= timestamp_dt and shares > 0:
                currently_owned_stocks[symbol] = transaction
                start += 1
            elif not transaction_type_is_buy and shares == 0:
                currently_owned_stocks.pop(symbol, None)
                start += 1

        total_profit_data_point = 0
        for symbol, transaction in currently_owned_stocks.items():
            shares = transaction["current_total_stock_shares"]
            investment = transaction["current_total_stock_investment"]
            price = historical_prices_dict[symbol].get(timestamp)
            if price:
                total_profit_data_point += ((shares * price) - investment)

        total_investment_data_array.append(total_profit_data_point + user.total_investment if currently_owned_stocks else user.total_investment)

    return {
        'prices': total_investment_data_array,
        'dates': date_points_array
    }, 200


@stocks_routes.route('/portfolio-chart-data/<int:user_id>')
@login_required
def user_portfolio_chart_data_by_id(user_id):
    """
    Placeholder route for getting portfolio chart data by user ID.
    TODO: Implement logic similar to current-user route using user_id instead of current_user.
    """
    return jsonify({
        'message': f'Portfolio chart data for user ID {user_id} will be implemented here.'
    }), 200
