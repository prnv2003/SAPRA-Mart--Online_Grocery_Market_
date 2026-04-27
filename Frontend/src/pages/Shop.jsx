import React, { useEffect, useState } from "react";
import "../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
    .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.log(err));
    }, []);

  // SEARCH FILTER
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  
  // GROUP PRODUCTS BY CATEGORY
  const groupedProducts = {};
  
  filteredProducts.forEach((product) => {
    const category = product.category || "Other";
    
    if (!groupedProducts[category]) {
      groupedProducts[category] = [];
    }
    
    groupedProducts[category].push(product);
  });

  const categories = [
    { name: "Dairy, Bread & Eggs", image: "https://cdn.grofers.com/app/images/collections/asset_Dairy,_bread_&_eggs_1697439479199" },
    { name: "Fruits & Vegetables", image: "https://cdn.grofers.com/app/images/collections/asset_V7_312x360_1776063046796", },
    { name: "Cold Drinks & Juices", image: "https://cdn.grofers.com/app/images/collections/asset_V7_312x360_(2)_1774455548692", },
    { name: "Snacks & Munchies", image: "http://cdn.grofers.com/app/images/collections/asset_Chips_&_namkeen_1697025537433", },
    { name: "Breakfast & Instant Food", image: "http://cdn.grofers.com/app/images/collections/asset_Instant_Food_(2)_1766127254031", },
    { name: "Sweet Tooth", image: "http://cdn.grofers.com/app/images/collections/asset_Sweets_&_chocolates_1697025717829", },
    { name: "Bakery & Biscuits", image: "http://cdn.grofers.com/app/images/collections/asset_Biscuits_&_bakery_1697023878012", },
    { name: "Tea, Coffee & Milk Drinks", image: "http://cdn.grofers.com/app/images/collections/asset_L0_v1_0_1746557294148", },
    { name: "Atta, Rice & Dal", image: "https://cdn.grofers.com/app/images/collections/asset_atta,_rice_&_dal_1697023078302", },
    { name: "Masala, Oil & More", image: "http://cdn.grofers.com/app/images/collections/asset_Oil,_ghee_&_masala_1697023177309", },
    { name: "Sauces & Spreads", image: "http://cdn.grofers.com/app/images/collections/asset_sauces_&_spreads_1697025783179", },
    { name: "Chicken, Meat & Fish", image: "http://cdn.grofers.com/app/images/collections/asset_chicken,_meat_&_fish_1697025365538", },
    { name: "Organic & Healthy", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/da/cms-assets/cms/product/ef810aa4-ce5a-4727-9cf2-dce7ff6610e4.jpg", },
    { name: "Baby Care", image: "http://cdn.grofers.com/app/images/collections/asset_Baby_care_1697028457580", },
    { name: "Pharma & Wellness", image: "http://cdn.grofers.com/app/images/collections/asset_Health_&_pharma_1697028551531", },
    { name: "Cleaning Essentials", image: "http://cdn.grofers.com/app/images/collections/asset_Cleaning_&_repellants-3_1711101791295", },
    { name: "Electronics", image: "http://cdn.grofers.com/app/images/collections/asset_Electronics_1697028762316", },
    { name: "Paan Corner", image: "http://cdn.grofers.com/app/images/collections/asset_312x360_(1)_1750440200815", },
    { name: "Personal Care", image: "http://cdn.grofers.com/app/images/collections/asset_Skin_&_face_(1)_1710665369044", },
    { name: "Stationery & Games", image: "http://cdn.grofers.com/app/images/collections/asset_Stationery_&_Games_1698999971211", },
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

        <div className="nav-right">
          <button className="login-btn">LOGIN</button>

          <div className="cart">
            🛒
            <span>0</span>
          </div>
        </div>
      </div>

          {/*  CATEGORY PILLS */}
          <div className="categories">
            {["All", "Grains", "Dairy", "Snacks", "Essentials"].map((cat, i) => (
              <div key={i} className="category-pill">
                {cat}
              </div>
            ))}
          </div> 

      {/* CATEGORY ICON CARDS */}
      <div className="category-section">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <div className="category-img">
              <img src={cat.image} alt={cat.name} />
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* PRODUCT CATEGORY ROWS */}
      <div className="sections-area">
        {Object.keys(groupedProducts).map((category, index) => (
          <div className="product-section" key={index}>
            <div className="section-header">
              <h2>{category}</h2>
              <span>see all</span>
            </div>

            <div className="section-row">
              {groupedProducts[category].map((p) => (
                <div className="product-card" key={p.id}>
                  <div className="img-box">
                    <img
                      src={
                        p.image
                          ? `http://localhost:8080/uploads/${p.image}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={p.name}
                    />
                  </div>

                  <p className="delivery">⏱ 10 MINS</p>

                  <h4>{p.name}</h4>

                  <p className="weight">{p.quantity} pcs</p>

                  <div className="bottom">
                    <span>₹{p.price}</span>
                    <button>ADD</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;