import { NavLink } from "react-router-dom";
import "./Navigation.css";


function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/" className="navigation-link">Home</NavLink>
      </li>

      <li>
        <NavLink to="/stocks"className="navigation-link">Stocks</NavLink>
      </li>
      <li>
        <NavLink to="/orders"className="navigation-link">Orders</NavLink>
      </li>

      <li>
        <NavLink to="/login"className="navigation-link">Log In</NavLink>
      </li>

      <li>
        <NavLink to="/signup"className="navigation-link">Sign Up</NavLink>
      </li>
      </ul>
  );
}

export default Navigation;
