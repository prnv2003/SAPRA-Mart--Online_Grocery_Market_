import React, { useEffect, useState } from "react";
import "../styles/Shop.css";
import { getProducts } from "../services/productApi";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const [search, setSearch] = useState("");

  return (
    <div className="shop-layout">
      {/* SIDEBAR */}
      <div className="shop-sidebar">
        <h3>SAPRA 🛒</h3>
        <ul>
          <li>🏠 Home</li>
          <li>🥦 Groceries</li>
          <li>🥤 Beverages</li>
          <li>🍞 Bakery</li>
          <li>👤 Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="shop-main">
        {/* NAVBAR */}
        <div className="shop-navbar">
          <h2>Welcome 👋</h2>

          <div className="nav-actions">
            <input
              placeholder="Search products 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
            <div className="cart-wrapper">
              <button className="cart-btn">🛒</button>
              <span className="cart-count">2</span>
            </div>{" "}
            <div className="profile">👤</div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="product-grid">
          {products
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <div className="product-card" key={p.id}>
                <img
                  src={`https://source.unsplash.com/300x300/?${p.name},grocery`}
                  alt={p.name}
                  loading="lazy"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=Product")
                  }
                />

                <h4>{p.name}</h4>
                <p className="category">{p.category}</p>
                <p className="price">₹{p.price}</p>

                <button className="add-btn">Add ➕</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
