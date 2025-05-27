import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spend } from '../../redux/wallet';
import { addOrder } from '../../redux/orders';
import StockChart from './StockChart';
import './StockDetails.css';


const fakeStocks = {
  AAPL: {
    name: 'Apple Inc.',
    currentPrice: 175.02,
    chartData: [
      {
        label: 'AAPL',
        data: [
          { date: new Date('2025-05-13'), value: 170 },
          { date: new Date('2025-05-14'), value: 174 },
          { date: new Date('2025-05-15'), value: 169 },
          { date: new Date('2025-05-16'), value: 175 },
        ],
      },
    ],
  },
  TSLA: {
    name: 'Tesla Inc.',
    currentPrice: 241.88,
    chartData: [
      {
        label: 'TSLA',
        data: [
          { date: new Date('2025-05-13'), value: 230 },
          { date: new Date('2025-05-14'), value: 235 },
          { date: new Date('2025-05-15'), value: 238 },
          { date: new Date('2025-05-16'), value: 241 },
        ],
      },
    ],
  },
  AMZN: {
    name: 'Amazon.com Inc.',
    currentPrice: 124.53,
    chartData: [
      {
        label: 'AMZN',
        data: [
          { date: new Date('2025-05-13'), value: 120 },
          { date: new Date('2025-05-14'), value: 122 },
          { date: new Date('2025-05-15'), value: 123 },
          { date: new Date('2025-05-16'), value: 124.53 },
        ],
      },
    ],
  },
};

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
        <button className="watch-button">Watch</button>
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