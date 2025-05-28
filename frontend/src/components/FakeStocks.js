const fakeStocks = {
    AAPL: {
      name: 'Apple Inc.',
      currentPrice: 175.02,
      chartData: [
        { label: 'AAPL', 
        data: [{ date: new Date('2025-05-13'), value: 170 }, 
        { date: new Date('2025-05-14'), value: 174 }, 
        { date: new Date('2025-05-15'), value: 169 }, 
        { date: new Date('2025-05-16'), value: 175 }]
     },
      ],
    },
    TSLA: {
      name: 'Tesla Inc.',
      currentPrice: 241.88,
      chartData: [
        { label: 'TSLA', 
        data: [{ date: new Date('2025-05-13'), value: 230 }, 
        { date: new Date('2025-05-14'), value: 235 }, 
        { date: new Date('2025-05-15'), value: 238 }, 
        { date: new Date('2025-05-16'), value: 241 }] },
      ],
    },
    AMZN: {
      name: 'Amazon.com Inc.',
      currentPrice: 124.53,
      chartData: [
        { label: 'AMZN',
         data: [{ date: new Date('2025-05-13'), value: 120 }, 
         { date: new Date('2025-05-14'), value: 122 },
          { date: new Date('2025-05-15'), value: 123 }, 
          { date: new Date('2025-05-16'), value: 124.53 }] 
        },
      ],
    },
  };
  
  export default fakeStocks;