from app.models import db, Stock
from sqlalchemy.sql import text


def seed_stocks():
    apple = Stock(stock_ticker='AAPL', company_name='Apple Inc.', price_per_share=150.00)
    google = Stock(stock_ticker='GOOGL', company_name='Alphabet Inc.', price_per_share=2800.00)
    amazon = Stock(stock_ticker='AMZN', company_name='Amazon.com Inc.', price_per_share=3400.00)

    db.session.add(apple)
    db.session.add(google)
    db.session.add(amazon)
    db.session.commit()

def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()