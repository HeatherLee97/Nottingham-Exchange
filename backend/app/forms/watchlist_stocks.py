from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, Length


class WatchlistStocksForm(FlaskForm):
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksDeleteForm(FlaskForm):
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksUpdateForm(FlaskForm):
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    new_watchlist_id = StringField("New Watchlist ID", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksDeleteAllForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    delete_all = StringField("Delete All", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetAllForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetByIdForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    stock_id = StringField("Stock ID", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetByNameForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    stock_name = StringField("Stock Name", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetBySymbolForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    stock_symbol = StringField("Stock Symbol", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetBySectorForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    stock_sector = StringField("Stock Sector", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
class WatchlistStocksGetByIndustryForm(FlaskForm):
    watchlist_id = StringField("Watchlist ID", validators=[DataRequired(), Length(min=1)])
    stock_industry = StringField("Stock Industry", validators=[DataRequired(), Length(min=1)])
    array = StringField("Stock Id Array", validators=[DataRequired(), Length(min=1)])
    