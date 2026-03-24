import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import { getProducts } from "../services/productApi";
import "../styles/Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        {/* STATS */}
        <div className="stats">
          <StatsCard title="Total Products" value={products.length} />
          <StatsCard
            title="Total Stock"
            value={products.reduce((sum, p) => sum + p.quantity, 0)}
          />
        </div>

        {/* RECENT PRODUCTS */}
        <div className="recent">
          <h3>Recent Products</h3>

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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
