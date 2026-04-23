import React, { useEffect, useState } from "react";
import "../styles/Shop.css";
import { useNavigate } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => console.log("Failed to fetch products"));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);

    if (existing) {
      setCart(
        cart.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p)),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // CATEGORY DATA (ADD THIS ABOVE return)
  const categories = [
    {
      name: "Dairy, Bread & Eggs",
      image:
        "https://cdn.grofers.com/app/images/collections/asset_Dairy,_bread_&_eggs_1697439479199",
    },
    {
      name: "Fruits & Vegetables",
      image:
        "https://cdn.grofers.com/app/images/collections/asset_V7_312x360_1776063046796",
    },
    {
      name: "Cold Drinks & Juices",
      image:
        "https://cdn.grofers.com/app/images/collections/asset_V7_312x360_(2)_1774455548692",
    },
    {
      name: "Snacks & Munchies",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Chips_&_namkeen_1697025537433",
    },
    {
      name: "Breakfast & Instant Food",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Instant_Food_(2)_1766127254031",
    },
    {
      name: "Sweet Tooth",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Sweets_&_chocolates_1697025717829",
    },
    {
      name: "Bakery & Biscuits",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Biscuits_&_bakery_1697023878012",
    },
    {
      name: "Tea, Coffee & Milk Drinks",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_L0_v1_0_1746557294148",
    },
    {
      name: "Atta, Rice & Dal",
      image:
        "https://cdn.grofers.com/app/images/collections/asset_atta,_rice_&_dal_1697023078302",
    },
    {
      name: "Masala, Oil & More",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Oil,_ghee_&_masala_1697023177309",
    },
    {
      name: "Sauces & Spreads",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_sauces_&_spreads_1697025783179",
    },
    {
      name: "Chicken, Meat & Fish",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_chicken,_meat_&_fish_1697025365538",
    },
    {
      name: "Organic & Healthy",
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/da/cms-assets/cms/product/ef810aa4-ce5a-4727-9cf2-dce7ff6610e4.jpg",
    },
    {
      name: "Baby Care",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Baby_care_1697028457580",
    },
    {
      name: "Pharma & Wellness",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Health_&_pharma_1697028551531",
    },
    {
      name: "Cleaning Essentials",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Cleaning_&_repellants-3_1711101791295",
    },
    {
      name: "Electronics",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Electronics_1697028762316",
    },
    {
      name: "Paan Corner",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_312x360_(1)_1750440200815",
    },
    {
      name: "Personal Care",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Skin_&_face_(1)_1710665369044",
    },
    {
      name: "Stationery & Games",
      image:
        "http://cdn.grofers.com/app/images/collections/asset_Stationery_&_Games_1698999971211",
    },
  ];

  return (
    <div className="shop-container">
      {/* NAVBAR */}
      <div className="navbar">
        <h2>SAPRA 🛒</h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="cart">
          🛒
          <span>{cart.length}</span>
        </div>
      </div>

      {/* CATEGORY SCROLL */}
      <div className="categories">
        {["All", "Grains", "Dairy", "Snacks", "Essentials"].map((cat, i) => (
          <div key={i} className="category-pill">
            {cat}
          </div>
        ))}
      </div>

      {/* CATEGORY SECTION */}
      <div className="category-section">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() =>
              navigate(`/category/${encodeURIComponent(cat.name)}`)
            }
          >
            <div className="category-img">
              <img
                src={cat.image || "https://via.placeholder.com/80"}
                alt={cat.name}
              />
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <div className="img-box">
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
              />
            </div>

            <h4>{p.name}</h4>
            <p className="category">{p.category}</p>

            <div className="bottom">
              <span>₹{p.price}</span>
              <button onClick={() => addToCart(p)}>ADD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
