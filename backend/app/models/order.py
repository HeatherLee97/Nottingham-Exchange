from .db import db, environment, SCHEMA, add_prefix_for_prod


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    stock_ticker = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_per_share = db.Column(db.Float, nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    


    def to_dict(self):
        return {
            'id': self.id,
            'stock_ticker': self.stock_ticker,
            'quantity': self.quantity,
            'price_per_share': self.price_per_share,
            'total_cost': self.total_cost,
            'status': self.status,
        }