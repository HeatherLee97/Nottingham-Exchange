import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StockChart from './StockChart';
import './StockDetails.css';

const StockDetails = () => {
  const [chartData, setChartData] = useState([]);
  const { stockSymbol } = useParams();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`/api/stocks/${stockSymbol}/history`);
        const rawData = await response.json();

        const transformedData = [
          {
            label: stockSymbol,
            data: Object.entries(rawData[stockSymbol]).map(([timestamp, value]) => ({
              date: new Date(timestamp),
              value,
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

  return (
    <div className="stock-details">
      <h2>{stockSymbol}</h2>
      <p>$175.02 <span className="up">+2 (1%)</span></p>
      <StockChart data={chartData} />
      <div className="stock-actions">
        <input id="buy-quantity" type="number" min="1" placeholder="Quantity" />
        <button>Buy</button>
        <button className="watch-button">Watch</button>
      </div>
    </div>
  );
};

export default StockDetails;