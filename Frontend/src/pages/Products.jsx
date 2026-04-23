import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  // eslint-disable-next-line no-unused-vars
  addProduct,
  getProducts,
  deleteProduct,
  // eslint-disable-next-line no-unused-vars
  updateProduct,
} from "../services/productApi";
import "../styles/Products.css";

function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortType, setSortType] = useState("");

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);

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

    if (!form.name || !form.category || !form.price || !form.quantity) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("image", image); // 👈 important

      await fetch("http://localhost:8080/products/add", {
        method: "POST",
        body: formData,
      });

      setToast({
        show: true,
        message: "Product added 🎉",
        type: "success",
      });

      await loadProducts();

      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
      });

      setImage(null);
    } catch (error) {
      setToast({
        show: true,
        message: "Error adding product ❌",
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

  const filteredProducts = products
    .filter(
      (p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase()) &&
        (p.category || "").toLowerCase().includes(categoryFilter.toLowerCase()),
    )
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortType === "priceLow") return a.price - b.price;
      if (sortType === "priceHigh") return b.price - a.price;
      if (sortType === "qtyLow") return a.quantity - b.quantity;
      if (sortType === "qtyHigh") return b.quantity - a.quantity;
      return 0;
    });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "SapraProducts.xlsx");
  };

  if (!products) return null;

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

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>

        </form>

        <br />
        {/* SEARCH */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search product 🔍"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY FILTER */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Essentials">Essentials</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Frozen">Frozen</option>
          </select>

          {/* SORT */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="qtyLow">Quantity ↑</option>
            <option value="qtyHigh">Quantity ↓</option>
          </select>
        </div>

        <button onClick={exportToExcel} className="export-btn">
          Export Excel 📁
        </button>

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
                {filteredProducts.map((p) => (
                  <tr key={p.id} className={p.quantity < 5 ? "low-stock" : ""}>
                    <td>{p.name || "-"}</td>
                    <td>{p.category || "-"}</td>
                    <td>₹{p.price || "-"}</td>
                    <td>
                      {p.quantity || "-"}
                      {p.quantity < 10 && (
                        <span className="low-badge">Low</span>
                      )}
                    </td>

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
