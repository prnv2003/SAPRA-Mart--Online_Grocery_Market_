import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../services/productApi";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [editId, setEditId] = useState(null);

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

    if (editId) {
      await updateProduct(editId, form);
      setEditId(null);
    } else {
      await addProduct(form);
    }

    setForm({ name: "", category: "", price: "", quantity: "" });
    loadProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="products-layout">
      <Sidebar />

      <div className="products-content">
        <h2>Product Inventory 📦</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="product-form">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* TABLE */}
        <div className="table-wrapper">
          {products.length === 0 ? (
            <div className="empty-box">
              <h3>No Products Yet 📦</h3>
              <p>Add your first product to get started 🚀</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className={p.quantity < 5 ? "low-stock" : ""}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.quantity}</td>

                    <td>
                      <button onClick={() => handleEdit(p)}>✏️</button>
                      <button onClick={() => handleDelete(p.id)}>🗑️</button>
                    </td>
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

export default Products;
