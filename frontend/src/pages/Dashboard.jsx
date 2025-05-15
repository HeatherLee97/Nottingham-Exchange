import React from 'react';
// import logo from './logo.svg';
import './Dashboard.css';
import Header from './Header';


const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard_header">
        <Header />
        </div>

      
      <div className="dashboard_body">
        <div className="dashboard_container">
            <Newsfeed />

        </div>

      </div>
        {/* Body */}
      
    </div>
  );
};

export default Dashboard;
