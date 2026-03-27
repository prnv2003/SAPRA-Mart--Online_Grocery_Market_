import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getProducts } from "../services/productApi";
import "../styles/Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products");
    }
  };

  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-layout">
      
      <Sidebar />

      <div className="main-content">

        {/* HEADER */}
        <div className="header">
          <h2>Welcome back, Pranav 👋</h2>

          <button className="logout-btn" onClick={handleLogout}>
            ⎋ Logout
          </button>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="card">
            <h4>Total Products</h4>
            <p>{products.length}</p>
          </div>

          <div className="card">
            <h4>Total Stock</h4>
            <p>{totalStock}</p>
          </div>

          <div className="card highlight">
            <h4>Low Stock Items</h4>
            <p>
              {products.filter((p) => p.quantity < 5).length}
            </p>
          </div>
        </div>

        {/* QUICK ACTION */}
        <div className="actions">
          <h3>Quick Actions</h3>
          <button onClick={() => (window.location.href = "/products")}>
            ➕ Add Product
          </button>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="recent">
          <h3>Recent Products</h3>

          {products.length === 0 ? (
            <p className="empty-text">
              No products available. Start by adding some 🚀
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>

              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;