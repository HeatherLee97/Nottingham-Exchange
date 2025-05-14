import React from 'react';
// import logo from './logo.svg';
import './Dashboard.css';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <Header />
      </header>

      {/* Body */}
      <main className="dashboard-body">
        {/* add routing or components here */}
      </main>
    </div>
  );
};

export default Dashboard;
