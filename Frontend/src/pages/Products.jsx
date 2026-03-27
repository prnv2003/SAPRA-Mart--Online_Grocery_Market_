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

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Auto-hide toast notification after 2500ms
  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2500);
    }
  }, [toast]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 FIXED HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.name || !form.category || !form.price || !form.quantity) {
      alert("Please fill all fields ❌");
      return;
    }

    // ✅ CONVERT TYPES
    const productData = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    try {
      if (editId) {
        // ✏️ UPDATE PRODUCT
        await updateProduct(editId, productData);
        setToast({
          show: true,
          message: "Product updated ✅",
          type: "success",
        });
        setEditId(null);
      } else {
        // ➕ ADD PRODUCT
        await addProduct(productData);
        setToast({ show: true, message: "Product added 🎉", type: "success" });
      }

      // 🔄 RELOAD PRODUCTS
      await loadProducts();

      // 🧹 RESET FORM
      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      //  🔥 HANDLE DUPLICATE ERROR
      setToast({
        show: true,
        message: error.message || "Product already exists ❌",
        type: "error",
      });
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Product deleted 🗑️");
      loadProducts();
    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="products-layout">
      <Sidebar />

      {toast.show && (
        <div className={`toast-container ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === "success" ? "✅" : "❌"}
          </div>
          <div className="toast-text">{toast.message}</div>
        </div>
      )}

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
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            placeholder="Quantity"
            type="number"
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