
import StockChart from './StockChart';
import './StockDetails.css';

const StockDetails = () => {
const chartData = [
  {
    label: 'AALC',
    data: [
      { date: new Date('2025-05-13'), value: 170 },
      { date: new Date('2025-05-14'), value: 174 },
      { date: new Date('2025-05-15'), value: 169 },
      { date: new Date('2025-05-16'), value: 175 },
    ],
  },
];
  

  return (
    <div className="stock-details">
      <h2>AAPL</h2>
      <p>$175.02 <span className="up">+2 (1%)</span></p>
      <StockChart data={chartData} />
      <div className="stock-actions">
      <input id="buy-quantity" type="number" min="1" placeholder="Quantity" />
      <button >Buy</button>
      <button className="watch-button">Watch</button>
      </div>
    </div>
  );
};

export default StockDetails;