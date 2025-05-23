import { getToken } from "./authService";

const BASE_URL = "https://lexiconapi.onrender.com/Api/Client";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Gets all the captions and keys
export const getAllWords = async () => {
  const res = await fetch(`${BASE_URL}/GetAllWords`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch words");
  return res.json();
};

// Adds new caption/key
export const addWord = async (key, property) => {
  const res = await fetch(`${BASE_URL}/AddWord`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ national: key, foreign: property }),
  });
  if (!res.ok) throw new Error("Failed to add word");
  return res.json();
};

// Updates new caption/key
export const updateWord = async (id, key, property) => {
  const res = await fetch(`${BASE_URL}/EditWord/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ national: key, foreign: property }),
  });
  if (!res.ok) throw new Error("Failed to update word");
  return res.json();
};

// Deletes
export const deleteWord = async (id) => {
  const res = await fetch(`${BASE_URL}/DeleteWord/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Failed to delete word");
};
