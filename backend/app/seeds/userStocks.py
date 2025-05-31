from app.models import db, UserStock
from sqlalchemy.sql import text


def seed_user_stocks():
    stock1 = UserStock(
        owner_id=1, stock_ticker='AAPL', total_shares=10, price_per_share=150.00, total_invested=1500.00, created_at='2023-10-01T12:00:00Z')
    stock2 = UserStock(
        owner_id=1, stock_ticker='GOOGL', total_shares=5, price_per_share=2800.00, total_invested=14000.00, created_at='2023-10-02T12:00:00Z')
    stock3 = UserStock(
        owner_id=2, stock_ticker='AMZN', total_shares=2, price_per_share=3400.00, total_invested=6800.00, created_at='2023-10-03T12:00:00Z')
    
    db.session.add(stock1)  
    db.session.add(stock2)
    db.session.add(stock3)
    db.session.commit()


def undo_user_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_stocks"))

    db.session.commit()