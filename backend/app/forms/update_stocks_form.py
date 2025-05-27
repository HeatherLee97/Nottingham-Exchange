from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Length, Optional




class UpdateStockForm(FlaskForm):
    stock_symbol = StringField("stock", validators=[Length(max=5)])
    stock_shares_bought = FloatField("stock shares", validators=[Optional()])
    stock_shares_sold = FloatField("stock shares", validators=[Optional()])
    price_per_share = FloatField("price per share bought", validators=[Optional()])
    price_per_share_sold = FloatField("price per share sold", validators=[Optional()])
    total_value = FloatField("total value", validators=[Optional()])
    transaction_fee = FloatField("transaction fee", validators=[Optional()])
    total_cost = FloatField("total cost", validators=[Optional()])
    start_date = StringField("start date", validators=[DataRequired(), Length(min=10, max=10)])
    end_date = StringField("end date", validators=[DataRequired(), Length(min=10, max=10)])
    interval = StringField("interval", validators=[DataRequired(), Length(min=1, max=10)])
    stock_symbols = StringField("stock symbols", validators=[DataRequired(), Length(min=1, max=100)])
    historical_data = StringField("historical data", validators=[Optional()])
    ticker_prices = StringField("ticker prices", validators=[Optional()])
    stock_symbols_list = StringField("stock symbols list", validators=[Optional()])
    stock_symbols_dict = StringField("stock symbols dict", validators=[Optional()])
    