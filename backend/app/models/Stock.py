from sqlalchemy.orm import validates, relationship
from sqlalchemy.types import Integer, String, Boolean
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import declarative_mixin
# from .watchlist import Watchlist




class Stock(db.Model):
    __tablename__ = "stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_ticker = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    price_per_share = db.Column(db.Float, nullable=False, default=0.0)


    # watchlists = relationship("Watchlist", secondary=watchlists_stocks, back_populates="stocks")

    # watchlists = relationship("Watchlist", secondary=watchlists_stocks, back_populates="stocks", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'stockSymbol': self.stock_symbol,
            'companyName': self.company_name,
            'pricePerShare': self.price_per_share
        }