import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FcSearch } from "react-icons/fc";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
      <ul>
        <li>
          <FcSearch className="search-icon" />
          <input type="text"
          placeholder="Search" />
        </li>
      </ul>
      <ProfileButton className="profile-button" />
    </ul>
  );
}

export default Navigation;
