import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navigation-link-container">
      {/* search */}
      <div className="header__search">
            <div className="header__searchContainer">
                  <input placeholder="Search" type="text" />
            </div>
      
      <div className="header__menuItems">
            <a href="#">Free Stocks</a>
            <a href="#">Portfolio</a>
            <a href="#">Cash</a>
            <a href="#">Messages</a>
            <a href="#">Account</a>
        </div>
      </div>
    <ul>
      

      <li>
        <ProfileButton />
      </li>
    </ul>
    </div>
  );
}

export default Navigation;