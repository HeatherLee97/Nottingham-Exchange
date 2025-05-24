import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5174;

app.use(cors());


const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.75 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 210.22 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 673.57 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 134.16 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2823.36 }
];


app.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Query too short' });
  }

  try {
    const [cryptoResults, stockResults] = await Promise.all([
      fetchCrypto(query),
      fetchStocks(query)
    ]);

    res.json([...cryptoResults, ...stockResults]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


async function fetchCrypto(query) {
  const searchURL = `https://api.coingecko.com/api/v3/search?query=${query}`;
  const { data } = await axios.get(searchURL);
  const coins = data.coins.slice(0, 5);

  const ids = coins.map(c => c.id).join(',');
  if (!ids) return [];

  const priceURL = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  const { data: prices } = await axios.get(priceURL);

  return coins.map(coin => ({
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    type: 'crypto',
    price: prices[coin.id]?.usd ?? 'N/A'
  }));
}


function fetchStocks(query) {
  return Promise.resolve(
    mockStocks
      .filter(stock =>
        stock.name.toLowerCase().includes(query) ||
        stock.symbol.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .map(stock => ({
        ...stock,
        type: 'stock'
      }))
  );
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
