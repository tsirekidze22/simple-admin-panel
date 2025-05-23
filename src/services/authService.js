const BASE_URL = "https://lexiconapi.onrender.com/Api/Client";

// Makes a POST request to the Register endpoint with user credentials
export const register = async (username, password) => {
  const response = await fetch(`${BASE_URL}/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      confirm_password: password,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Error:", error);
    throw new Error("Registration failed!!");
  }

  // if successful, return the JSON response
  return response.json();
};

// if registration fails log the error text and throw JS error
export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

// Removes saved authentication data from local storage
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

// Retrieves the saved JWT token from local storage
export const getToken = () => localStorage.getItem("token");
// Retrieve the saved username from local storage
export const getUsername = () => localStorage.getItem("username");
