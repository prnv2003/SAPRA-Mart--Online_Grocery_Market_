const BASE_URL = "http://localhost:8080/api/auth";

export const signupUser = async (data) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.text();
};