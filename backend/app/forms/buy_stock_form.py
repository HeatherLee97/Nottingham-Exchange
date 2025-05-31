from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, NumberRange
from app.models import Order


def order_exists(form, field):
    
    order_id = field.data
    order = Order.query.filter(Order.order_id == order_id).first()
    if not order:
        raise ValidationError('Order ID does not exist.')

class BuyStockForm(FlaskForm):
    stock_ticker = StringField("Stock Ticker", validators=[DataRequired()])
    stock_shares = IntegerField("Shares", validators=[DataRequired(), NumberRange(min=1)])
    price_per_share = FloatField("Price Per Share", validators=[DataRequired(), NumberRange(min=0)])