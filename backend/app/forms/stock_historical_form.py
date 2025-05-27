from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, FloatField, FieldList
from wtforms.validators import DataRequired, Length


class HistoricalDataForm(FlaskForm):
    stocks_info = StringField("stock info", validators=[DataRequired(), Length(min=5)])
    start_date = StringField("start date", validators=[DataRequired(), Length(min=10, max=10)])
    end_date = StringField("end date", validators=[DataRequired(), Length(min=10, max=10)])
    interval = StringField("interval", validators=[DataRequired(), Length(min=1, max=10)])
    historical_data = FieldList(FloatField("historical data"), min_entries=1, max_entries=1000)
class StockSymbolForm(FlaskForm):
    stock_symbol = StringField("stock symbol", validators=[DataRequired(), Length(max=5)])
    start_date = StringField("start date", validators=[DataRequired(), Length(min=10, max=10)])
    end_date = StringField("end date", validators=[DataRequired(), Length(min=10, max=10)])
    interval = StringField("interval", validators=[DataRequired(), Length(min=1, max=10)])
    historical_data = FieldList(FloatField("historical data"), min_entries=1, max_entries=1000)

