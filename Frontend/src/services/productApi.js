const PRODUCT_URL = "http://localhost:8080/api/products";

// ✅ GET PRODUCTS
export const getProducts = async () => {
  const res = await fetch(PRODUCT_URL);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// ✅ ADD PRODUCT WITH IMAGE
export const addProduct = async (formData) => {
  const res = await fetch(`${PRODUCT_URL}/add`, {
    method: "POST",
    body: formData, // ❌ NO JSON, NO HEADERS
  });

  if (!res.ok) throw new Error("Failed to add product");

  return res.json();
};

// ✅ DELETE
export const deleteProduct = async (id) => {
  await fetch(`${PRODUCT_URL}/${id}`, {
    method: "DELETE",
  });
};

// ✅ UPDATE
export const updateProduct = async (id, product) => {
  const res = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return res.json();
};