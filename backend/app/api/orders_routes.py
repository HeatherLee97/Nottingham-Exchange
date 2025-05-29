from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Order, User
from app.forms.BuyStockForm import BuyStockForm

orders_routes = Blueprint('orders', __name__)

def validate_funds(user, amount):
    return user.wallet >= amount

@orders_routes.route('/orders', methods=['POST'])
@login_required
def create_order():
    """
    Create a new pending order.
    """
    form = BuyStockForm()

    if not form.validate_on_submit():
        return {'errors': form.errors}, 400

    stock_symbol = form.stock_symbol.data.upper()
    quantity = form.stock_shares.data
    price_per_share = form.price_per_share.data
    total_cost = quantity * price_per_share

    user = current_user

    if not validate_funds(user, total_cost):
        return {'error': 'Insufficient funds'}, 403

 
    user.wallet -= total_cost


    new_order = Order(
        user_id=user.id,
        stock_symbol=stock_symbol,
        quantity=quantity,
        price_per_share=price_per_share,
        status="pending"
    )

    db.session.add(new_order)
    db.session.commit()

    return {'order': new_order.to_dict(), 'wallet': round(user.wallet, 2)}, 201


@orders_routes.route('/orders/<int:order_id>', methods=['PUT'])
@login_required
def update_order(order_id):
    """
    Update quantity of an existing pending order.
    """
    user = current_user
    order = Order.query.get(order_id)

    if not order or order.user_id != user.id:
        return {'error': 'Order not found'}, 404

    if order.status != 'pending':
        return {'error': 'Only pending orders can be updated'}, 400

    data = request.get_json()
    new_quantity = data.get('quantity')

    if not isinstance(new_quantity, int) or new_quantity <= 0:
        return {'error': 'Invalid quantity'}, 400

    old_total = order.quantity * order.price_per_share
    new_total = new_quantity * order.price_per_share
    diff = new_total - old_total

    if diff > 0 and not validate_funds(user, diff):
        return {'error': 'Insufficient funds to increase order'}, 403


    user.wallet -= diff
    order.quantity = new_quantity

    db.session.commit()

    return {'order': order.to_dict(), 'wallet': round(user.wallet, 2)}, 200


@orders_routes.route('/orders/<int:order_id>', methods=['DELETE'])
@login_required
def cancel_order(order_id):
    """
    Cancel a pending order.
    """
    user = current_user
    order = Order.query.get(order_id)

    if not order or order.user_id != user.id:
        return {'error': 'Order not found'}, 404

    if order.status != 'pending':
        return {'error': 'Only pending orders can be cancelled'}, 400

    refund_amount = order.quantity * order.price_per_share

    user.wallet += refund_amount
    db.session.delete(order)
    db.session.commit()

    return {'message': 'Order cancelled', 'wallet': round(user.wallet, 2)}, 200