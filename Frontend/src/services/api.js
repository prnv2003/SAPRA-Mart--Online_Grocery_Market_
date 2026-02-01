const BASE_URL = "http://localhost:8080/api/auth";

// ================= SIGNUP =================
export const signupUser = async (data) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Signup failed");
  }

  return text; // Signup returns plain text
};

// ================= LOGIN =================
export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json(); // 🔥 IMPORTANT CHANGE

  if (!response.ok) {
    throw new Error(json.message || "Login failed");
  }

  return json; // { success: true/false, message: "..." }
};
