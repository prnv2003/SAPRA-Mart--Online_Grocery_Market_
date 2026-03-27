const PRODUCT_URL = "http://localhost:8080/api/products";

export const addProduct = async (product) => {
  const response = await fetch(PRODUCT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(PRODUCT_URL);
  return response.json();
};

// 🗑️ DELETE
export const deleteProduct = async (id) => {
  await fetch(`${PRODUCT_URL}/${id}`, {
    method: "DELETE",
  });
};

// ✏️ UPDATE
export const updateProduct = async (id, product) => {
  const response = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
};