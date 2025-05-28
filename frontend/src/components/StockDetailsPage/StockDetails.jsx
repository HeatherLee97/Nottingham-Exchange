import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spend } from '../../redux/wallet';
import { addOrder } from '../../redux/orders';
import StockChart from './StockChart';
import { addToWatchlist } from '../../redux/watchlist';
import './StockDetails.css';
import fakeStocks from '../FakeStocks';




const StockDetails = () => {
  const { stockSymbol } = useParams();
  const stock = fakeStocks[stockSymbol?.toUpperCase()] || null;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const wallet = useSelector(state => state.wallet);
  const dispatch = useDispatch();



  const handleBuy = () => {
    const shares = Number(quantity);
    if (isNaN(shares) || shares < 1) {
      alert("Please enter a valid number of shares");
      return;
    }
    const price = stock.currentPrice;
    const total = shares * price;
    if (total > wallet) {
      alert("Not enough funds");
      return;
    }
    dispatch(spend(total));
    dispatch(addOrder({ symbol: stockSymbol.toUpperCase(), shares, price }));
    setShowConfirmation(true);
    setQuantity('');  
  };

  if (!stock) {
    return <div className="stock-details">Stock not found.</div>;
  }

  return (
    <div className="stock-details">
      <h2>{stock.name} ({stockSymbol.toUpperCase()})</h2>
      <p>
        ${stock.currentPrice.toFixed(2)}
        <span className="up"> +2 (1%)</span>
      </p>
      <StockChart data={stock.chartData} />
      <div className="stock-actions">
        <input
          id="buy-quantity"
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleBuy}>Buy</button>
        <button className="watch-button" onClick={() => dispatch(addToWatchlist(stockSymbol.toUpperCase()))}>Watch</button>
      </div>
      {showConfirmation && (
  <div className="confirmation">
    <p>You bought {quantity} share(s) of {stockSymbol.toUpperCase()}!</p>
    <button onClick={() => navigate('/orders')}>Go to Orders</button>
  </div>
)}
    </div>
  );
};

export default StockDetails;