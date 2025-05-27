import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StockChart from './StockChart';
import './StockDetails.css';

const StockDetails = () => {
  const [chartData, setChartData] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const { stockSymbol } = useParams();
 

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`/api/stock_routes/${stockSymbol}/history`);
        const rawData = await response.json();

        const transformedData = [
          {
            label: stockSymbol,
            data: rawData.prices.map(({ timestamp, price }) => ({
              date: new Date(timestamp),
              value: price,
            })),
          },
        ];

        setChartData(transformedData);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    fetchChartData();
  }, [stockSymbol]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(`/api/stock_routes/price/${stockSymbol}`);
        const data = await res.json();
        setCurrentPrice(data.liveStockPrice);
      } catch (err) {
        console.error("Failed to fetch live price:", err);
      }
    };
  
    fetchPrice();
  }, [stockSymbol]);

  


  const handleBuy = async () => {
    const quantity = parseInt(document.getElementById('buy-quantity').value);
    if (!quantity || quantity <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    const price_per_share = currentPrice; 
  
    const response = await fetch('/api/order_routes/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock_symbol: stockSymbol,
        stock_shares: quantity,
        price_per_share: price_per_share
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      alert(`Order placed! Remaining wallet: $${data.wallet}`);
    } else {
      const errorData = await response.json();
      alert(`Failed: ${errorData.error || JSON.stringify(errorData.errors)}`);
    }
  };

  return (
    <div className="stock-details">
      <h2>{stockSymbol}</h2>
      <p>
        {currentPrice !== null ? `$${currentPrice.toFixed(2)}` : 'Loading price...'}
        <span className="up">+2 (1%)</span>
      </p>
      <StockChart data={chartData} />
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
    </div>
  );
};

export default StockDetails;