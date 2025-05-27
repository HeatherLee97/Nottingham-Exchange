from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Length


class SellStockForm(FlaskForm):
    stock_symbol = StringField("stock", validators=[DataRequired(), Length(max=5)])
    price_per_share_sold = FloatField("price per share sold", validators=[DataRequired()])
    stock_shares = FloatField("stock shares", validators=[DataRequired()])
    total_value = FloatField("total value", validators=[DataRequired()])
    transaction_fee = FloatField("transaction fee", validators=[DataRequired()])
    total_cost = FloatField("total cost", validators=[DataRequired()])
    