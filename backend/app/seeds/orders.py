from app.models import db, Order, User
from sqlalchemy.sql import text


def seed_orders():
    demo = Order(
        username='Demo', stock_ticker='AAPL', quantity= 5, price_per_share= 55.00, total_cost= 275.00, status='pending')
    marnie = Order(
        username='marnie', stock_ticker='GOOGL', quantity= 10, price_per_share= 100.00, total_cost= 1000.00, status='pending')   
    bobbie = Order(
        username='bobbie', stock_ticker='AMZN', quantity= 2, price_per_share= 150.00, total_cost= 300.00, status='pending')
    

    db.session.add(demo)    
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()

