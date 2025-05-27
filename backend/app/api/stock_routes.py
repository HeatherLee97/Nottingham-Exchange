from flask import Blueprint, jsonify, request, json
from flask_login import login_required, current_user
from app.models import db, User, Watchlist, Stock, Transaction
from app.forms import WatchlistForm, StocksSearchForm, TickerPricesForm, HistoricalDataForm
from app.utils import companyInfo, keyStatistics
from sqlalchemy import or_
import yfinance as yf
from yahoo_fin import stock_info as si
from bs4 import BeautifulSoup, SoupStrainer
import threading
import requests
from datetime import datetime, timedelta

stocks_routes = Blueprint('stocks', __name__)


## GET all user WatchLists

@stocks_routes.route('/<stock_symbol>')
@login_required
def get_stock_info(stock_symbol):
    """
    Query for all user watchlists with user_id and returns all watchlsits in a dictionary
    """

    symbol = stock_symbol.upper()
    session = requests.Session()
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'}

    stock= Stock.query.filter(Stock.stock_symbol == symbol).first()

    x = threading.Thread(target=keyStatistics, args=(symbol, session))
    x.start()
    # y = threading.Thread(target=funcTwo, args=(symbol, session, headers))
    # y.start()
    company_info_dict = companyInfo(symbol, session, headers)

    formatted_res = {
        'id': stock.id,
        'stockDescription': company_info_dict["stockDescription"] if company_info_dict["stockDescription"] != None else '_',
        'employees': company_info_dict["employees"] if company_info_dict["employees"] != None else '_',
        'headquarters': company_info_dict["headquarters"] if company_info_dict["headquarters"] != None else '_',
        'Sector': company_info_dict["sector"] if company_info_dict["sector"] != None else '_',
        'marketCap': company_info_dict["Market Cap"] if company_info_dict["Market Cap"] != None else '_',
        'priceEarningsRatio': company_info_dict["PE Ratio (TTM)"],
        'dividendYield': company_info_dict["Forward Dividend & Yield"].split(" ")[0] if company_info_dict["Forward Dividend & Yield"].split(" ")[0] != 0 else '_',
        'averageVolume': company_info_dict["Avg. Volume"] if company_info_dict["Avg. Volume"] != None else '_',
        'highToday': company_info_dict["Day's Range"].split(" - ")[1] if company_info_dict["Day's Range"] != None else '_',
        'lowToday': company_info_dict["Day's Range"].split(" - ")[0] if company_info_dict["Day's Range"] != None else '_',
        'openPrice': company_info_dict["Open"] if company_info_dict["Open"] != None else '_',
        'volume': company_info_dict["Volume"] if company_info_dict["Volume"] != None else '_',
        'fiftyTwoWeekHigh': company_info_dict["52 Week Range"].split(" - ")[1] if company_info_dict["52 Week Range"] != None else '_',
        'fiftyTwoWeekLow': company_info_dict["52 Week Range"].split(" - ")[0] if company_info_dict["52 Week Range"] != None else '_',
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
        print(f"Downloaded data shape: {data.shape}")
        if data.empty:
            return jsonify({'error': 'No data found for this stock'}), 404

        close_data = data['Close'].dropna()
        chart_data = [
            {'timestamp': ts.isoformat(), 'price': round(price, 2)}
            for ts, price in close_data.items()
        ]

        return jsonify({
            'symbol': symbol,
            'prices': chart_data
        }), 200

    except Exception as e:
        print(f"Error fetching chart data for {symbol}: {e}")
        return jsonify({'error': 'Failed to fetch chart data'}), 500

@stocks_routes.route('/price/<stock_symbol>')
@login_required
def get_stock_price(stock_symbol):
    """
    Query for all user watchlists with user_id and returns all watchlsits in a dictionary
    """
    price = si.get_live_price(stock_symbol)

    return {"liveStockPrice": price}, 200

@stocks_routes.route('/prices', methods=['POST'])
@login_required
def get_stocks_prices():
    """
    Query for all user watchlists with user_id and returns all watchlsits in a dictionary
    """
    form = TickerPricesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # stock_symbols=form.data["stock_symbols"]
    print(form.data['stock_symbols'], "STOCKSYMBOLS")
    stocks = json.loads(form.data['stock_symbols'])
    prices = {}
    for stock in stocks:
        price = si.get_live_price(stock)
        prices[stock]=price
    print(prices, "PRICES")
    return {"liveStockPrices": prices}, 200

@stocks_routes.route('/historical', methods=['POST'])
@login_required
def get_stocks_historical_data():


    form = HistoricalDataForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data["stocks_info"], "FOMRDATA")
    data=json.loads(form.data['stocks_info'])
    print(data, "DATA")
    stock_symbols = data["stock_symbols"]


    now = datetime.now()
    one_week_ago = now - timedelta(days=1)
    date_string = one_week_ago.strftime('%m/%d/%Y')
    print(date_string)

    # symbols = ['AAPL', "TSLA"]
    start_date = one_week_ago
    end_date = now

    new_data = {}
    if 'tickers' in data:
        ticker_data = {}
        tickers = data["tickers"]

        removed_duplicates =[]




        print(removed_duplicates, "TICKERS REMOVED DUPLICATES")
        if (len(tickers) == 1) or ((len(tickers) == 2) and (tickers[0] == tickers[1])):
            historical_data = yf.download(tickers=tickers[0], period='1wk', interval='30m')
            close_prices = historical_data['Close']
            ticker_data[tickers[0]] = json.loads(close_prices.to_json())
            print(ticker_data, "PLEASETICKERDATA")
            return ticker_data, 200

        historical_data = yf.download(tickers=tickers, period='1wk', interval='30m', threads=True)
        close_prices = historical_data['Close']



        # ticker_data[symbol]=json.loads(close_prices.to_json())

        print(close_prices.to_json(), "STOCKSYMBOLS")
        return close_prices.to_json(), 200



    print(stock_symbols, "FINAL STOCKS SYMBOLS")
    for stock in stock_symbols:
        now = datetime.now()
        symbol = stock[0]
        interval = stock[1]
        period = stock[2]
        time_period = None
        # date_string = None
        if period == '1wk':
            time_period = now - timedelta(weeks=1)
            # date_string = time_period.strftime('%m/%d/%Y')
        elif period == '1d':
            time_period = now - timedelta(days=1)
            # date_string = time_period.strftime('%m/%d/%Y')
        elif period == '1mo':
            time_period = now - timedelta(weeks=4)
            # date_string = time_period.strftime('%m/%d/%Y')
        elif period == '3mo':
            time_period = now - timedelta(weeks=12)
            # date_string = time_period.strftime('%m/%d/%Y')
        elif period == '1y':
            time_period = now - timedelta(days=365)
            
        elif period == '5y':
            time_period = now - timedelta(days=1825)
           



        print(time_period, "TIME PERIOD")

        
        start_date = time_period
        end_date = now
        if period == '1d':
            historical_data = yf.download(tickers=symbol, period=period, interval=interval)
            close_prices = historical_data['Close']


            
        else:
            historical_data = yf.download(tickers=symbol, start=start_date, end=end_date, interval=interval)
            close_prices = historical_data['Close']


            
        new_data[symbol]=json.loads(close_prices.to_json())

    print(new_data)

    
    return new_data, 200



## GET a specific Watchlist by id

@stocks_routes.route('/', methods=["POST"])
@login_required
def find_stocks():
    """
    Query for a user by id and returns that user in a dictionary
    """
    form = StocksSearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    stocks = Stock.query.filter(or_(Stock.company_name.ilike(f'%{form.data["name"]}%'), Stock.stock_symbol.ilike(f'{form.data["name"]}%'))).order_by(Stock.company_name).limit(6)
    if len(list(stocks)) > 0:
        return {'stocks': [stock.to_dict() for stock in stocks]}, 200
    else: return {"errors": "could not find stocks"}


@stocks_routes.route('/portfolio-chart-data/current-user')
@login_required
def user_portfolio_historical_data():
    """
    Query for all user portfolio proffit and loss chart data
    """
    user = current_user
    user_created_date = f'{user.created_at}'
    datetime_object = datetime.strptime(user_created_date, '%Y-%m-%d %H:%M:%S.%f')
    user_created_date_formatted = datetime_object.strftime("%Y-%m-%d")
    date_now = datetime.now()
    date_string = "2023-01-26"
    date_format = "%Y-%m-%d"
    

    total_investment_data_array = []
    current_total = user.total_investment
    transactions_query = Transaction.query.filter(Transaction.owner_id == user.id).order_by(Transaction.created_at)
    transactions = [transaction.to_dict() for transaction in transactions_query]
  
    symbols = []
    

    symbolSet = set({})
    for transaction in transactions:
        stock_symbol = transaction["stock_symbol"]
        if stock_symbol not in symbolSet:
            symbolSet.add(stock_symbol)
            symbols.append(stock_symbol)

    

    historical_data = yf.download(tickers=symbols, start=user_created_date_formatted, end = date_now, interval='1h')
    historical_close_prices = historical_data['Close'].to_json()
    historical_prices_dict = json.loads(historical_close_prices)
    
    currently_owned_stocks = {}
    first_key = next(iter(historical_prices_dict))
    date_points_array = list(historical_prices_dict[first_key].keys())
    current_user_stocks = {}
    print(historical_prices_dict[first_key].items(), "timestamps")
    for timestamp, data in historical_prices_dict[first_key].items():
        timestampInt = int(timestamp) / 1000
        timestamp_to_datetime = datetime.fromtimestamp(timestampInt)
        start = 0
        print(timestamp_to_datetime, "in for loop")
        for i,transaction in enumerate(transactions[start:]):
            current_total_stock_shares = transaction["current_total_stock_shares"]
            transaction_stock_symbol = transaction["stock_symbol"]
            print(transaction_stock_symbol, "STOCKTRANSACTIONSYMBOL")
            transaction_created_at = transaction["created_at"]
            print(transaction_created_at, "in for loop SYMBO L TRANSACTION", transaction_created_at <= timestamp_to_datetime and current_total_stock_shares > 0, start)
            transaction_type_is_buy = transaction["is_buy"]

            if transaction_created_at <= timestamp_to_datetime and current_total_stock_shares > 0:
                currently_owned_stocks[transaction_stock_symbol] = transaction
                start+=1
                print("YES", transaction_stock_symbol, "STOCKTRANSACTIONSYMBOL")
            else: break

            if transaction_type_is_buy == False and current_total_stock_shares == 0:
                del currently_owned_stocks[transaction_stock_symbol]
                start+=1

        total_profit_data_point = 0
        print(currently_owned_stocks, "PRICE")
        if len(currently_owned_stocks.keys()) > 0:
            for symbol, transaction in currently_owned_stocks.items():
                current_total_stock_shares = transaction["current_total_stock_shares"]
                current_total_stock_investment = transaction["current_total_stock_investment"]
                price = historical_prices_dict[symbol][timestamp]
                
                if price != None:
                    total_profit_data_point += ((current_total_stock_shares * price) - current_total_stock_investment)
            total_investment_data_array.append(total_profit_data_point + user.total_investment)
        else:
            total_investment_data_array.append(user.total_investment)



    print(total_investment_data_array, len(total_investment_data_array),"TOTALARRAY")
    print(date_points_array,len(date_points_array), "DATEARRAY")
    return {'prices': total_investment_data_array,
            'dates': date_points_array
            }, 200


@stocks_routes.route('/portfolio-chart-data/<int:user_id>')