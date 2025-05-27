from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, NumberRange

class BuyStockForm(FlaskForm):
    stock_symbol = StringField("Stock Symbol", validators=[DataRequired()])
    stock_shares = IntegerField("Shares", validators=[DataRequired(), NumberRange(min=1)])
    price_per_share = FloatField("Price Per Share", validators=[DataRequired(), NumberRange(min=0)])