import { getAuthHeader } from "./api";

const PRODUCT_URL = "http://localhost:8080/api/products";

export const getProducts = async () => {
  const res = await fetch(PRODUCT_URL, {
    headers: {
      ...getAuthHeader(),
    },
  });

  return res.json();
};

export const addProduct = async (data) => {
  const res = await fetch(PRODUCT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
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
