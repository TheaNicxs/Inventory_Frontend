// js/api.js
const API_BASE = "https://inventory-store-api.onrender.com";

/**
 * Centralized fetch wrapper with logging
 */
async function safeFetch(url, options = {}) {
  console.log("Fetching:", url, options);

  try {
    const res = await fetch(url, options);
    console.log("Response status:", res.status);

    // Handle non-OK responses
    if (!res.ok) {
      let message = await res.text().catch(() => null);
      const errorMsg = `${res.status} ${message || res.statusText}`;
      console.error("API error:", errorMsg);
      throw new Error(errorMsg);
    }

    // Handle 204 No Content
    if (res.status === 204) return null;

    // Parse JSON safely
    try {
      const data = await res.json();
      console.log("Response data:", data);
      return data;
    } catch {
      console.warn("No JSON in response");
      return null;
    }
  } catch (err) {
    console.error("Network or fetch error:", err);
    throw err; // rethrow for frontend handling
  }
}

// ===== API FUNCTIONS =====

// GET all items
async function fetchList(resource) {
  return safeFetch(`${API_BASE}/${resource}`);
}

// POST create item
async function createItem(resource, data) {
  return safeFetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// PUT update item
async function updateItem(resource, id, data) {
  return safeFetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// DELETE item
async function deleteItem(resource, id) {
  return safeFetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
  });
}

// ===== EXPORTS =====
export { fetchList, createItem, updateItem, deleteItem };

// Attach to window for non-module usage
window.API = { fetchList, createItem, updateItem, deleteItem };
