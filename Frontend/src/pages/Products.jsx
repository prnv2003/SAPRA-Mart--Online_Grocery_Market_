import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  addProduct,
  getProducts,
  deleteProduct,
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

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2500);
    }
  }, [toast]);

  // ✅ LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD / UPDATE PRODUCT   // ✅ FIXED HANDLE SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);

      if (image) {
        formData.append("image", image);
      }

      if (editId) {
        await updateProduct(editId, formData);

        setToast({
          show: true,
          message: "Product Updated Successfully 🎉",
          type: "success",
        });
      } else {
        await addProduct(formData);

        setToast({
          show: true,
          message: "Product Added Successfully 🎉",
          type: "success",
        });
      }

      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
      });

      setImage(null);
      setEditId(null);

      loadProducts();
    } catch (error) {
      setToast({
        show: true,
        message: "Something went wrong ❌",
        type: "error",
      });
    }
  };
  
  // ✅ EDIT
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
    });
    setEditId(product.id);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  // ✅ FILTER + SORT
  const filteredProducts = products
    .filter(
      (p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter ? p.category === categoryFilter : true),
    )
    .sort((a, b) => {
      if (sortType === "priceLow") return a.price - b.price;
      if (sortType === "priceHigh") return b.price - a.price;
      return 0;
    });

  // ✅ EXPORT
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([buffer]);
    saveAs(file, "products.xlsx");
  };

  return (
    <div className="products-layout">
      <Sidebar />

      {toast.show && (
        <div className={`toast-container ${toast.type}`}>{toast.message}</div>
      )}

      <div className="products-content">
        <h2>Product Inventory 📦</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="product-form">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          {/* IMAGE INPUT */}
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* FILTER */}
        <div className="filters">
          <input
            placeholder="Search 🔍"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Dairy, Bread & Eggs">Dairy, Bread & Eggs</option>
            <option value="Snacks & Munchies">Snacks & Munchies</option>
            <option value="Atta, Rice & Dal">Atta, Rice & Dal</option>
            <option value="Masala, Oil & More">Masala, Oil & More</option>
            <option value="Breakfast & Instant Food">
              Breakfast & Instant Food
            </option>
            <option value="Tea, Coffee & Milk Drinks">
              Tea, Coffee & Milk Drinks
            </option>
            <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Cleaning Essentials">Cleaning Essentials</option>
            <option value="Frozen">Frozen</option>
          </select>

          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sort</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
          </select>
        </div>

        <button onClick={exportToExcel} className="export-btn">
          Export Excel
        </button>

        {/* TABLE */}
        <div className="table-wrapper">
          {products.length === 0 ? (
            <p>No products yet</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.image ? (
                        <img
                          src={`http://localhost:8080/uploads/${p.image}`}
                          width="50"
                          alt=""
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

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
