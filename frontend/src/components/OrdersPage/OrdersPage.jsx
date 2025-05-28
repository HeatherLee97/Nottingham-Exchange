import { useSelector, useDispatch } from 'react-redux';
import { refund, spend } from '../../redux/wallet.js'
import { cancelOrder, updateOrder } from '../../redux/orders';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeFromWatchlist } from '../../redux/watchlist';
import fakeStocks from '../FakeStocks.js';
import './OrdersPage.css';


const OrdersPage = () => {
  const orders = useSelector(state => state.orders);
  const wallet = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist);
  const [editingId, setEditingId] = useState(null);
  const [newShares, setNewShares] = useState(0);
  const navigate = useNavigate();

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
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h2>My Orders</h2>
          <p className="wallet-info">Wallet: ${wallet.toFixed(2)}</p>
        </div>
        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <strong>{order.symbol}</strong> @ ${order.price.toFixed(2)} <br />
            {editingId === order.id ? (
              <>
                <input
                  type="number"
                  value={newShares}
                  min="1"
                  onChange={(e) => setNewShares(Number(e.target.value))}
                />
                <button className="save" onClick={() => handleUpdate(order)}>Save</button>
                <button className="cancel-edit" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p className="price">{order.shares} shares</p>
                <button className="edit" onClick={() => handleEditClick(order)}>Edit</button>
                <button className="cancel-order" onClick={() => handleCancel(order)}>Cancel</button>
              </>
            )}
          </div>
        ))}
      </div>
  
      <div className="watchlist">
        <h3>Watchlist</h3>
        {watchlist.length === 0 ? (
          <p>No stocks in watchlist.</p>
        ) : (
          <ul>
            {watchlist.map(symbol => {
              const stock = fakeStocks[symbol];
              if (!stock) return null;
              return (
                <li key={symbol}>
                  <span
                    className="watchlist-link"
                    onClick={() => navigate(`/stock/${symbol}`)}
                  >
                    <strong>{symbol}</strong>: ${stock.currentPrice.toFixed(2)}
                  </span>
                  <button onClick={() => dispatch(removeFromWatchlist(symbol))}>Remove</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default OrdersPage;