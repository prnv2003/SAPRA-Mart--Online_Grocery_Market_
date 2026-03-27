import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef();

  // 🔥 CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div ref={sidebarRef} className={`sidebar ${open ? "active" : ""}`}>
        <h3>SAPRA Mart</h3>

        <Link to="/dashboard" onClick={() => setOpen(false)}>
          Dashboard
        </Link>

        <Link to="/products" onClick={() => setOpen(false)}>
          Products
        </Link>
      </div>
    </>
  );
}

export default Sidebar;