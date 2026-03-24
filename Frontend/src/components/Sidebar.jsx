import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>SAPRA Mart</h3>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/products">Products</Link>
    </div>
  );
}

export default Sidebar;