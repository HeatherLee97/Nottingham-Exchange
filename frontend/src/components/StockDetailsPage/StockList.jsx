import { useNavigate } from 'react-router-dom';
import './StockList.css';

const mockStocks = {
  AAPL: { name: 'Apple Inc.', currentPrice: 175.02 },
  TSLA: { name: 'Tesla Inc.', currentPrice: 241.88 },
  AMZN: { name: 'Amazon.com Inc.', currentPrice: 124.53 },
};

const StockList = () => {
  const navigate = useNavigate();

  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className="stock-list-container">
      <h2>Market Overview</h2>
      <div className="stock-list">
        {Object.entries(mockStocks).map(([symbol, { name, currentPrice }]) => (
          <div
            key={symbol}
            className="stock-card"
            onClick={() => handleClick(symbol)}
          >
            <h3>{name} ({symbol})</h3>
            <p className="price">${currentPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;