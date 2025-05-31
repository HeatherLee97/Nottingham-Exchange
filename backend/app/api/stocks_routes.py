from flask import Blueprint, jsonify, request, json
from flask_login import login_required, current_user
from app.models import db, User, Stock, order
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

@stocks_routes.route('/<stock_ticker>')
@login_required
def get_stock_info(stock_ticker):
    ticker = ticker.upper()
    


    stock = Stock.query.filter(Stock.stock_ticker == symbol).first()

    if not stock:
        return ({'error': 'Stock not found'}), 404

    stock_info = {
        'stock_ticker': stock.stock_ticker,
        'company_name': stock.company_name,
        'price': stock.price_per_share,
    }

    return jsonify(stock_info), 200

@stocks_routes.route('/price/<stock_symbol>')
@login_required
def get_stock_price(stock_ticker):
    price = price_per_share 
    return ({"Price Per Share:" }), 200


    


# @stocks_routes.route('/portfolio-chart-data/current-user')
# @login_required
# def user_portfolio_historical_data():
#     user = current_user
#     datetime_object = datetime.strptime(str(user.created_at), '%Y-%m-%d %H:%M:%S.%f')
#     user_created_date_formatted = datetime_object.strftime("%Y-%m-%d")
#     date_now = datetime.now()

#     total_investment_data_array = []
#     current_total = user.total_investment
#     transactions_query = Transaction.query.filter(Transaction.owner_id == user.id).order_by(Transaction.created_at)
#     transactions = [transaction.to_dict() for transaction in transactions_query]

#     symbols = []
#     symbolSet = set()
#     for transaction in transactions:
#         stock_symbol = transaction["stock_symbol"]
#         if stock_symbol not in symbolSet:
#             symbolSet.add(stock_symbol)
#             symbols.append(stock_symbol)

#     historical_data = yf.download(tickers=symbols, start=user_created_date_formatted, end=date_now, interval='1h')
#     historical_prices_dict = json.loads(historical_data['Close'].to_json())
#     date_points_array = list(historical_prices_dict[next(iter(historical_prices_dict))].keys())

#     currently_owned_stocks = {}
#     for timestamp in date_points_array:
#         timestamp_dt = datetime.fromtimestamp(int(timestamp) / 1000)
#         start = 0
#         for i, transaction in enumerate(transactions[start:]):
#             transaction_created_at = transaction["created_at"]
#             transaction_type_is_buy = transaction["is_buy"]
#             symbol = transaction["stock_symbol"]
#             shares = transaction["current_total_stock_shares"]

#             if transaction_created_at <= timestamp_dt and shares > 0:
#                 currently_owned_stocks[symbol] = transaction
#                 start += 1
#             elif not transaction_type_is_buy and shares == 0:
#                 currently_owned_stocks.pop(symbol, None)
#                 start += 1

#         total_profit_data_point = 0
#         for symbol, transaction in currently_owned_stocks.items():
#             shares = transaction["current_total_stock_shares"]
#             investment = transaction["current_total_stock_investment"]
#             price = historical_prices_dict[symbol].get(timestamp)
#             if price:
#                 total_profit_data_point += ((shares * price) - investment)

#         total_investment_data_array.append(total_profit_data_point + user.total_investment if currently_owned_stocks else user.total_investment)

#     return {
#         'prices': total_investment_data_array,
#         'dates': date_points_array
#     }, 200


# @stocks_routes.route('/portfolio-chart-data/<int:user_id>')
# @login_required
# def user_portfolio_chart_data_by_id(user_id):
#     """
#     Placeholder route for getting portfolio chart data by user ID.
#     TODO: Implement logic similar to current-user route using user_id instead of current_user.
#     """
#     return jsonify({
#         'message': f'Portfolio chart data for user ID {user_id} will be implemented here.'
#     }), 200
