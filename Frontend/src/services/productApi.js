const PRODUCT_URL = "http://localhost:8080/api/products";

export const getProducts = async () => {
  const res = await fetch(PRODUCT_URL);
  return await res.json();
};

export const addProduct = async (formData) => {
  const res = await fetch(`${PRODUCT_URL}/add`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to add product");
  }

  return await res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${PRODUCT_URL}/${id}`, {
    method: "DELETE",
  });
};

export const updateProduct = async (id, formData) => {
  const res = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update");
  }

  return await res.json();
};
