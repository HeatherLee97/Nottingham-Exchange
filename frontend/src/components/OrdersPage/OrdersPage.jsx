import { useSelector, useDispatch } from 'react-redux';
import { refund, spend } from '../../redux/wallet.js'
import { cancelOrder, updateOrder } from '../../redux/orders';
import { useState } from 'react';

const OrdersPage = () => {
  const orders = useSelector(state => state.orders);
  const wallet = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [newShares, setNewShares] = useState(0);

  const handleEditClick = (order) => {
    setEditingId(order.id);
    setNewShares(order.shares);
  };

  const handleUpdate = (order) => {
    const diff = newShares - order.shares;
    const totalDiffCost = diff * order.price;

    if (diff > 0) {
      if (totalDiffCost > wallet) {
        alert("Not enough funds for additional shares.");
        return;
      }
      dispatch(spend(totalDiffCost));
    } else if (diff < 0) {
      dispatch(refund(Math.abs(totalDiffCost)));
    }

    dispatch(updateOrder(order.id, newShares));
    setEditingId(null);
  };

  const handleCancel = (order) => {
    dispatch(refund(order.price * order.shares));
    dispatch(cancelOrder(order.id));
  };

  return (
    <div>
      <h2>My Orders</h2>
      <p>Wallet: ${wallet.toFixed(2)}</p>
      {orders.map(order => (
        <div key={order.id}>
          <strong>{order.symbol}</strong> @ ${order.price.toFixed(2)} <br />
          {editingId === order.id ? (
            <>
              <input
                type="number"
                value={newShares}
                min="1"
                onChange={(e) => setNewShares(Number(e.target.value))}
              />
              <button onClick={() => handleUpdate(order)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {order.shares} shares
              <button onClick={() => handleEditClick(order)}>Edit</button>
              <button onClick={() => handleCancel(order)}>Cancel</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;