const input = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

input.addEventListener('input', async () => {
  const query = input.value.trim().toLowerCase();

  if (query.length < 2) {
    resultsList.innerHTML = '';
    return;
  }

  resultsList.innerHTML = '<li>Loading...</li>';

  try {
    const cryptoResults = await fetchCrypto(query);
    const stockResults = await fetchStocks(query);

    displayResults([...cryptoResults, ...stockResults]);
  } catch (error) {
    console.error(error);
    resultsList.innerHTML = '<li>Error fetching results.</li>';
  }
});



async function fetchCrypto(query) {
    const searchResponse = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
    const searchData = await searchResponse.json();
    const coins = searchData.coins.slice(0, 5);


    const ids = coins.map(c => c.id).join(',');
    const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const prices = await priceResponse.json();

    return coins.map(coin => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      type: 'crypto',
      price: prices[coin.id]?.usd ?? 'N/A'
    }));
  }



  async function fetchStocks(query) {
    const mockStocks = [
      { name: 'Apple Inc.', symbol: 'AAPL', type: 'stock', price: '150.75' , id: '1', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png'},
      { name: 'Microsoft Corporation', symbol: 'MSFT', type: 'stock', price: '210.22' , id: '2', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
      { name: 'Tesla, Inc.', symbol: 'TSLA', type: 'stock', price: '673.57' , id: '3', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg'},
      { name: 'Amazon.com, Inc.', symbol: 'AMZN', type: 'stock', price: '134.16' , id: '4', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'},
      { name: 'Alphabet Inc.', symbol: 'GOOGL', type: 'stock', price: '2823.36' , id: '5', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg'}
    ];

    return mockStocks
      .filter(stock =>
        stock.name.toLowerCase().includes(query) || stock.symbol.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .map(stock => ({ ...stock, type: 'stock' }));
  }

  function displayResults(results) {
    resultsList.innerHTML = '';

    if (results.length === 0) {
      resultsList.innerHTML = '<li>No results found.</li>';
      return;
    }

    results.forEach(result => {
      const li = document.createElement('li');

      li.innerHTML = `
        <strong>${result.symbol}</strong> — ${result.name}
        <span style="float:right; color: gray;">[${result.type}]</span>
      `;

      resultsList.appendChild(li);
    });
  }
