import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Watchlists from '../Watchlists';
import StockDetails from '../StockDetailsPage';
import StockChart from '../StockDetailsPage/StockChart';
import Graph from '../Graph';
import { getCandle } from '../../store/candles';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeFrameText, setTimeFrameText] = useState('Today');
  const [timeFrame, setTimeFrame] = useState('1D');
  const [color, setColor] = useState('green');
  const [change, setChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [activePrice, setActivePrice] = useState(0);
  const [startingPrice, setStartingPrice] = useState(0);
  const [currPrice, setCurrPrice] = useState(0);
  const [quotes, setQuotes] = useState({});
  const candlesList = useSelector(state => state.candles);

  const assetList = useSelector(state => Object.values(state.portfolio.assets));
  const assetSymbols = assetList.map(asset => asset.symbol);
  const watchlists = Object.values(useSelector(state => state.portfolio.watchlists));

  const bp = useSelector(state => state.portfolio.buying_power).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    (async () => {
      let sum = 0;
      const quotes = {};
      for (const symbol of assetSymbols) {
        const res = await fetch(`/api/stocks/${symbol}/quote`);
        const quote = await res.json();
        sum += quote.current * assetList.find(asset => asset.symbol === symbol).count;
        quotes[symbol] = quote;
      }

      const watchlistSet = new Set();
      for (const watchlist of watchlists) {
        for (const stock of Object.values(watchlist.stocks)) {
          if (!assetSymbols.includes(stock.symbol)) {
            watchlistSet.add(stock.symbol);
          }
        }
      }

     
      for (const symbol of watchlistSet) {
        const res = await fetch(`/api/stocks/${symbol}/quote`);
        const quote = await res.json();
        quotes[symbol] = quote;
      }

      

      setCurrPrice(sum);
      setQuotes(quotes);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      for (const symbol of assetSymbols) {
        const candle = candlesList[timeFrame]?.[symbol];

        if (!candle) {
          await dispatch(getCandle(timeFrame, symbol));
        }
      }
    })();

    setIsLoaded(true);
  }, [timeFrame]);

  // Some stocks are missing timestamps in candle data... so have to filter those time frames out
  const candles = {};
  for (const [symbol, data] of Object.entries(candlesList[timeFrame] || {})) {
    if (assetSymbols.includes(symbol)) {
      data.forEach(d => {
        candles[d.time] = {
          ...candles[d.time],
          [symbol]: d.price * assetList.find(asset => asset.symbol === symbol).count,
        };
      });
    }
  }

  // Filters out incomplete timestamp datas and returns as {timestamp: summed price}
  const filtedCandles = Object.fromEntries(
    Object.entries(candles)
      .filter(candle => Object.keys(candle[1]).length === assetSymbols.length)
      .map(candle => [candle[0], Object.values(candle[1]).reduce((price, sum) => price + sum)])
  );

  const times = Object.keys(filtedCandles);
  const prices = Object.values(filtedCandles);

  useEffect(() => {
    setStartingPrice(prices[0]);
  }, [prices]);

  useEffect(() => {
    if (currPrice - startingPrice < 0) {
      setColor('red');
    }
  }, [currPrice, startingPrice]);

  useEffect(() => {
    const change = (activePrice || currPrice) - startingPrice;
    const percentChange = (change * 100) / startingPrice;
    setChange(change);
    setChangePercent(percentChange);
  }, [currPrice, activePrice, startingPrice]);

  return (
    <div className='dashboard_Container'>
      <div className='left_Container'>
        <div className='portfolio_Container'>
          <div className='portfolio_Value'>{`${(activePrice || currPrice)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}`}</div>
          <div className='price_Change'>
            <span>
              {`${change > 0 ? '+' : ''}${change.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })} (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%)`}
            </span>
            <span className='timeFrame'> {timeFrameText}</span>
          </div>
          <div className='chart_Container'>
            {isLoaded && (
              <StockChart
                times={times}
                prices={prices}
                color={color}
                inverval={timeFrame}
                setActivePrice={setActivePrice}
              />
            )}
          </div>
          <div className={'buying_Power_Container' + `${showMenu ? ' selected' : ''}`}>
            <div className='bpHeader noSelect' onClick={() => setShowMenu(!showMenu)}>
              <span>Buying Power</span>
              {!showMenu && <span>{bp}</span>}
            </div>
            {showMenu && (
              <div className='bpBody'>
                <div className='bpDetails'>
                  <div className='cash'>
                    <span>Brokerage Cash</span>
                    <span>{bp}</span>
                  </div>
                  <div className='power'>
                    <span>Buying Power</span>
                    <span>{bp}</span>
                  </div>
                  <Link className='btn btn-filled deposit' to='/add-funds'>
                    Deposit Funds
                  </Link>
                </div>
                <div className='bpMessage'>
                  Buying Power represents the total value of assets you can purchase.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='right_Wrapper'>
        <div className='right_Container'>
          <div className='stocks_List_Container'>
            <div className='list_Container'>
              <header className='list_Title'>Stocks</header>
              {assetList.map(asset => (
                <Link className='stock_Container' key={asset.id} to={`/stocks/${asset.symbol}`}>
                  <div className='stock_Details'>
                    <span className='stock_Symbol'>{asset.symbol}</span>
                    <span className='stock_Count'>{`${asset.count} ${
                      asset.count === 1 ? 'Share' : 'Shares'
                    }`}</span>
                  </div>
                  <div className='mini_Chart'></div>
                  <div className='stock_Quote'>
                    <span className='stock_Price'>
                      {quotes[asset.symbol]?.current.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                    <span
                      className={`stock_Change ${
                        quotes[asset.symbol]?.change > 0 ? 'green' : 'red'
                      }`}
                    >
                      {`${quotes[asset.symbol]?.change > 0 ? '+' : ''}${
                        quotes[asset.symbol]?.change
                      }`}
                      %
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Watchlists quotes={quotes} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;