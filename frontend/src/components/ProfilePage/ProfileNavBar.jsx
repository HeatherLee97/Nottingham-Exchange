import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import ProfileNavBar from "../../css/ProfileNavBar.css";
import logoIcon from "../../css/images/risinghoodblackicon.png";
import searchIcon from "../../css/images/searchIcon.svg";
import { fetchStockSearch } from "../../store/stocks";
import User from "../User";
import { logout } from "../../store/session";


const ProfileNavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const searchedStocks = useSelector((state) => state.stocks.searchedStocks);
  const user = useSelector((state) => state.session.user);
  const [searchName, setSearchName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef(null);
  console.log(searchedStocks, "searcheds tocks");


    const onLogout = async (e) => {
      await dispatch(logout());
    };

  useEffect(() => {
    console.log("fetching");
    dispatch(fetchStockSearch(searchName));
  }, [searchName]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const closeMenu = (event) => {
      if (event.target.tagName !== "INPUT") {
        setIsFocused(false);
      }
    };

    // click event listener to whole doc -- if we click on page it will run
    // closeMenu!! -- really sets 'setShowMenu' to false or our slice of state on showing menu
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isFocused]);

  useEffect(() => {
    if (!isClicked) {
      return;
    }
    const closeMenu = () => {
      setIsClicked(false);
    };

    // click event listener to whole doc -- if we click on page it will run
    // closeMenu!! -- really sets 'setShowMenu' to false or our slice of state on showing menu
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isClicked]);

  return (
    <div className="profile-nav-container">
      <div className="profile-logo-container">
        <NavLink to="/profile">
          <img src={logoIcon} alt="logo" />
        </NavLink>
      </div>

      <div className="profile-search-bar-container">
        <div className="profile-search-bar">
          <div className="profile-left-search-box">
            <img src={searchIcon} alt="search" />
          </div>



              <input
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                  }
                }}
                ref={inputRef}
                name={
                  searchName && isFocused ? "expanded-search-bar" : "search-bar"
                }
                placeholder="Search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onClick={() => {
                  if (document.activeElement === inputRef.current) {
                    setIsFocused(true);
                  }
                }}
                autoComplete="off"
              />


          {searchName && isFocused && (
            <div className="stock-search-container">
              {searchedStocks.stocks?.map((stock, index) => {
                return (
                  <div key={index}>
                    <div className="search-stock-container" onClick={() => history.push(`/stocks/${stock.stockSymbol}`)}>
                      <div className="searched-stock-symbol">
                        {console.log("STOCK", stock.stockSymbol)}
                        {stock.stockSymbol}
                      </div>
                      <div className="searched-stock-company">
                        {stock.companyName}
                        {/* {stock.companyName.includes('(') ? stock.companyName.split('(')[0] : stock.companyName} */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="profile-nav-links">
        <NavLink className="profile-link" to="/stocks/AAPL">
          Rewards
        </NavLink>
        <NavLink className="profile-link" to="/stocks/TSLA">
          Investing
        </NavLink>
        <NavLink className="profile-link" to="/stocks/GM">
          Spending
        </NavLink>
        <NavLink className="profile-link" to="/stocks/GOOGL">
          Retirement
        </NavLink>
        <NavLink className="profile-link" to="/stocks/AMC">
          Notifications
        </NavLink>
        <div className="account-link" onClick={() => setIsClicked(!isClicked)}>
          Account
        </div>
        {isClicked && (
          <div className="account-dropdown-container">
            <div className="logout-container" onClick={onLogout}><div className="logout-text">Logout</div></div>
            <div className="first-name-dropdown"><div className="first-name-text">{user.firstName} {user.lastName}</div></div>
            <div className="user-Wallet-power-dropdown"><div className="Wallet-power-dropdown-text">Wallet Power : ${user.Wallet_power}</div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNavBar;