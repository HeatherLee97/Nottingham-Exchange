from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, FloatField, FieldList
from wtforms.validators import DataRequired, Length

class TickerPricesForm(FlaskForm):
    stock_symbols = StringField("stock info", validators=[DataRequired(), Length(min=5)])
    start_date = StringField("start date", validators=[DataRequired(), Length(min=10, max=10)])
    end_date = StringField("end date", validators=[DataRequired(), Length(min=10, max=10)])
    interval = StringField("interval", validators=[DataRequired(), Length(min=1, max=10)])
    ticker_prices = FieldList(FloatField("ticker prices"), min_entries=1, max_entries=1000)
class StockSymbolsForm(FlaskForm):
    stock_symbols = StringField("stock symbols", validators=[DataRequired(), Length(min=1, max=100)])
    start_date = StringField("start date", validators=[DataRequired(), Length(min=10, max=10)])
    end_date = StringField("end date", validators=[DataRequired(), Length(min=10, max=10)])
    interval = StringField("interval", validators=[DataRequired(), Length(min=1, max=10)])
    historical_data = FieldList(FloatField("historical data"), min_entries=1, max_entries=1000)
    ticker_prices = FieldList(FloatField("ticker prices"), min_entries=1, max_entries=1000)
    stock_symbols_list = FieldList(StringField("stock symbol"), min_entries=1, max_entries=100)
    stock_symbols_dict = FieldList(StringField("stock symbol"), min_entries=1, max_entries=100)
    stock_symbols_dict_list = FieldList(StringField("stock symbol"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_list = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_dict = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_dict_list = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_dict_list_dict = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_dict_list_dict_list = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_dict_list_dict_list = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)
    stock_symbols_dict_prices_dict_list_dict_list_list = FieldList(FloatField("stock symbol price"), min_entries=1, max_entries=100)


    