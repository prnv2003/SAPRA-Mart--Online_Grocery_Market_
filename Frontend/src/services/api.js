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

  // ✅ Always parse JSON
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Signup failed");
  }

  return json; // { success, message }
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

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Login failed");
  }

  return json; // { success, message }
};
