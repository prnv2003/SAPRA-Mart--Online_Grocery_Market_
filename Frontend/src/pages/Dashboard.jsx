import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to SAPRA Mart Dashboard 👋</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Available Stock</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <p>0</p>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
