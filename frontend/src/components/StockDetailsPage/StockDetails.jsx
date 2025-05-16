import React from 'react';
import StockChart from './StockChart';
import './StockDetails.css';

const StockDetails = () => {
  const chartData = [
    {
      label: 'AALC',
      data: [
        [new Date('2025-05-13'), 170],
        [new Date('2025-05-14'), 174],
        [new Date('2025-05-15'), 169],
        [new Date('2025-05-16'), 175],
      ]
    }
  ];

  return (
    <div className="stock-details">
      <h2>AAPL</h2>
      <p>$175.02 <span className="up">+2 (1%)</span></p>
      <StockChart data={chartData} />
      <div className="stock-actions">
      <button className="buy-button">Buy</button>
      <button className="watch-button">Watch</button>
      </div>
    </div>
  );
};

export default StockDetails;