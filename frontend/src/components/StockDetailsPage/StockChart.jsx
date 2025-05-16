import React from 'react';
import { Chart } from 'react-charts';

const StockChart = ({ data }) => {
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Chart data={data} axes={axes} tooltip />
    </div>
  );
};

export default StockChart;