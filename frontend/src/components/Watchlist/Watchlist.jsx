import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../css/NavBar.css";
import "../../css/profilePage.css";
import "../../css/Watchlist.css";



import DeleteWatchlistModal from "./DeleteWatchlistModal";
import { Modal } from "../../context/Modal";

import { fetchAddWatchlist, fetchAllWatchlists } from "../../store/lists";
import { fetchAllUserStocks } from "../../store/transactions";
import {
  clearHistoricalData,
  fetchHistoricalData,
  fetchStocksPrices,
} from "../../store/stocks";



const Watchlists = () => {
  const dispatch = useDispatch();

  const allUserStocks = useSelector((state) => state.transactions.allUserStocks);
  const user = useSelector((state) => state.session.user);
  const allStockPrices = useSelector((state) => state.stocks.liveStocksPrices);
  const watchlists = useSelector((state) => state.lists.watchlists);

  const [hoveredList, setHoveredList] = useState(null);
  const [isClicked, setIsClicked] = useState([]);
  const [listName, setListName] = useState("");
  const [clickedList, setClickedList] = useState(null);
  const [isAddingWatchlist, setIsAddingWatchlist] = useState(false);
  const [showEditWatchlistMenu, setshowEditWatchlistMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listId, setListId] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(clearHistoricalData());
    dispatch(fetchAllWatchlists());
    dispatch(fetchAllUserStocks(user.id));
  }, [dispatch, user.id]);

  const formatStocks = useCallback(() => {
    let stockInfoArray = [];

    if (Object.values(allUserStocks).length !== 0) {
      Object.values(allUserStocks).forEach((stock) => {
        stockInfoArray.push(stock.stockSymbol);
      });
    }
    if (Object.values(watchlists).length !== 0) {
      Object.values(watchlists).forEach((watchlist) => {
        watchlist.stocks.forEach((stock) => {
          stockInfoArray.push(stock.stock_symbol);
        });
      });
    }
    // console.log(stockInfoArray, "STOCKFORMATTED");
    return stockInfoArray;
  }, [allUserStocks, watchlists]);

  const stocksArray = formatStocks();

  useEffect(() => {
    dispatch(fetchHistoricalData({ stock_symbols: [], tickers: stocksArray }));
  }, [dispatch, stocksArray]);

  useEffect(() => {
    if (stocksArray.length) {
      dispatch(fetchStocksPrices(stocksArray));
      const interval = setInterval(() => {
        dispatch(fetchStocksPrices(stocksArray));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [dispatch, stocksArray]);

  useEffect(() => {
    if (!showEditWatchlistMenu) {
      return;
    }
    const closeMenu = () => {
      setshowEditWatchlistMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showEditWatchlistMenu]);

  const stringCheck = (str) =>
    str
      .split(" ")
      .filter((c) => c !== "")
      .join("").length >= 3;

  const inputReducer = (str) => str.replace(/\s+/g, " ").trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (stringCheck(listName)) {
      let name = inputReducer(listName);

      return dispatch(fetchAddWatchlist(name))
        .then(() => {
          setIsAddingWatchlist(false);
          setListName("");
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors(Object.values(data));
          else setIsAddingWatchlist(false);
        });
    } else {
      setErrors(["Name needs to be at least three characters"]);
    }
  };

  const watchlistsComponents = Object.values(watchlists)?.map((watchlist, index) => {
    return (
      <div
        key={watchlist.id}
        onMouseEnter={() => setHoveredList(index)}
        onMouseLeave={() => setHoveredList(null)}
      >
        <div
          className="watchlist-header"
          onClick={() => {
            if (!isClicked.includes(index)) {
              setIsClicked([...isClicked, index]);
            } else {
              let i = isClicked.indexOf(index);
              let removedIndex = [...isClicked];
              removedIndex.splice(i, 1);
              setIsClicked([...removedIndex]);
            }
          }}
        >
          {clickedList === index && showEditWatchlistMenu && (
            <div
              className="edit-dropdown"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="edit-list"
                onClick={() => {
                  setShowEditModal(true);
                  setListId(watchlist.id);
                }}
              >
                Edit list
              </div>
              <div
                className="delete-list"
                onClick={() => {
                  setShowDeleteModal(true);
                  setListId(watchlist.id);
                }}
              >
                Delete list
              </div>
            </div>
          )}
          <div className="watchlist-name">
            <div className="bulb">
              <img
                src={"https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"}
                alt="bulb"
              />
            </div>
            {watchlist.watchlistName}
          </div>
          <div className="watchlist-buttons">
            {hoveredList === index && (
              <div className="watchlist-edit-button">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setshowEditWatchlistMenu(!showEditWatchlistMenu);
                    setClickedList(index);
                  }}
                >
                  {/* <img src={editImg} alt="edit" /> */}
                </button>
              </div>
            )}

            <div className="watchlist-arrow">
              {/* <img src={arrowImg} alt="arrow" /> */}
            </div>
          </div>
        </div>
        {isClicked.includes(index) &&
          watchlist.stocks.map((stock, idx) => {
            return (
              <div key={idx}>
                <NavLink
                  className="stock-links"
                  to={`/stocks/${stock.stock_symbol}`}
                >
                  <div className="watchlist-header">
                    <div className="watchlist-name stocks">
                      {stock.stock_symbol}
                    </div>
                    <div className="profile-charts">
                      {/* <ProfileStockChart stockSymbol={stock.stock_symbol} /> */}
                    </div>
                    <div className="watchlist-price">
                      {Object.values(allStockPrices).length
                        ? `$${allStockPrices[stock.stock_symbol]?.toFixed(2)}`
                        : "...Loading"}
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
      </div>
    );
  });

  const userStocksComponents = Object.values(allUserStocks)?.map((stock, index) => {
    return (
      <div key={index} className="user-stocks">
        <NavLink className="stock-links" to={`/stocks/${stock.stockSymbol}`}>
          <div className="user-stock-link">
            <div className="user-stock-header">
              <div className="user-stock-left">
                <div className="user-stock-name">{stock.stockSymbol}</div>
                <div className="user-stock-shares">
                  {`${stock.totalShares}`.length > 1
                    ? stock.totalShares.toFixed(2)
                    : stock.totalShares}{" "}
                  Shares
                </div>
              </div>
              <div className="user-stocks-chart">
                {/* <ProfileStockChart stockSymbol={stock.stockSymbol} /> */}
              </div>
              <div className="user-stock-price-container">
                <div className="stock-price">
                  {Object.values(allStockPrices).length
                    ? `$${allStockPrices[stock.stockSymbol]?.toFixed(2)}`
                    : "...Loading"}
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="lists-container">
      <div className="stocks-list">
        <div className="header-title">
          <div className="header-text">Stocks</div>
        </div>
        <div className="user-stocks-container">{userStocksComponents}</div>
      </div>
      <div className="stocks-list">
        <div className="header-title list-header">
          <div className="header-text">Lists</div>
          <div
            className="add-watchlist-button"
            onClick={() => setIsAddingWatchlist(true)}
          >
            {/* <img src={addImg} alt="add" /> */}
          </div>
        </div>
        {isAddingWatchlist && (
          <div className="add-watchlist-container">
            <div className="watchlist-form">
              <div className="bulb-container">
                <div className="bulb">
                  <img
                    src={"https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"}
                    alt="bulb"
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="List Name"
                  minLength="3"
                  maxLength="20"
                  name="input"
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  required
                />
                <div className="buttons-add">
                  <div
                    className="cancel-add-list"
                    onClick={() => setIsAddingWatchlist(false)}
                  >
                    Cancel
                  </div>
                  <button className="add-list-submit" type="submit">
                    Create List
                  </button>
                </div>
              </form>
              {errors.length > 0 && (
                <div className="form-errors">
                  {errors.map((error, i) => (
                    <div key={i} className="error">
                      {error}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="watchlist-container">{watchlistsComponents}</div>
      </div>

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          {/* <EditWatchlistModal watchlistId={listId} onClose={() => setShowEditModal(false)} /> */}
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteWatchlistModal watchlistId={listId} onClose={() => setShowDeleteModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Watchlists;
