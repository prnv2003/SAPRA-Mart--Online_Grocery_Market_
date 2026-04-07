import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef();

  // 📱 Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ❌ Close on outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* ☰ SHOW ONLY ON MOBILE + WHEN CLOSED */}
      {isMobile && !open && (
        <button className="menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
      )}

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`sidebar ${isMobile ? (open ? "active" : "") : ""}`}
      >
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