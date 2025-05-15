import React from 'react';
import Logo from './robinhood.svg';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

function Header() {
  return (
    <header className="header__wrapper">
      {/* Logo */}
      <div className="header__logo">
        <img src={Logo} alt="Logo" width={25} />
      </div>

      {/* Search */}
      <div className="header__search">
        <div className="header__searchContainer">
          {/* <SearchIcon className="SearchIcon" /> */}
          <input
            type="text"
            placeholder="Search"
            aria-label="Stocks"
          />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="header__menuItems">
        <a href="#">Stocks</a>
        <a href="#">Portfolio</a>
        <a href="#">Cash</a>
        <a href="#">Watchlist</a>
        <a href="#">Account</a>
      </nav>
    </header>
  );

  
}

export default Header;
