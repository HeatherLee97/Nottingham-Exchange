// src/App.jsx

import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header>
        <h1>Nottingham Exchange</h1>
        <nav>
          <Link to="/profile">Profile</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Sign Up</Link> |{" "}
          <Link to="/stocks">Stocks</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
