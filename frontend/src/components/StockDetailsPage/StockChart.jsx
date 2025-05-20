import React from 'react';
import { Chart } from 'react-charts';

const StockChart = ({ data }) => {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: datum => datum.date,
      scaleType: 'time',
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: datum => datum.value,
        scaleType: 'linear',
      },
    ],
    []
  );

  return (
    <div style={{ width: '100%', height: '300px ', marginBottom: '80px' }}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
};

export default StockChart;