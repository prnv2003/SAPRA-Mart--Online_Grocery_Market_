import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

  const increaseQty = (id) => {
    setCart(cart.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0),
    );
  };

  useEffect(() => {
    fetch(`http://localhost:8080/products/category/${name}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [name]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{name} 🛒</h2>

      {/* <div className="cart">
        🛒 <span>{cart.length}</span>
      </div> */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => {
          const item = cart.find((c) => c.id === p.id);

          return (
            <div key={p.id} className="product-card">
              <img
                src={`http://localhost:8080/uploads/${p.image}`}
                alt={p.name}
              />

              <h4>{p.name}</h4>
              <p>₹{p.price}</p>

              {item ? (
                <div className="qty-box">
                  <button onClick={() => decreaseQty(p.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(p.id)}>+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(p)}>Add</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
