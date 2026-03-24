import React from "react";

function Header() {
  return (
    <div className="header">
      <h2>SAPRA Mart Dashboard</h2>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;