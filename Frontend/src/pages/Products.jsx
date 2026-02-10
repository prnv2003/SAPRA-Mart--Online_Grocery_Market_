import React, { useEffect, useState } from "react";
import { addProduct, getProducts } from "../services/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    loadProducts();
    setForm({ name: "", category: "", price: "", quantity: "" });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Product Inventory</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <hr />

      <h3>Available Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} | {p.category} | ₹{p.price} | Qty: {p.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;