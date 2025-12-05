// js/api.js
const API_BASE = "https://inventory-store-api.onrender.com";

// Central response handler
async function handleResponse(res) {
  if (!res.ok) {
    let message = await res.text().catch(() => null);
    throw new Error(`${res.status} ${message || res.statusText}`);
  }

  // 204 No Content
  if (res.status === 204) return null;

  // Try parsing JSON safely
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// GET all items
async function fetchList(resource) {
  const res = await fetch(`${API_BASE}/${resource}`);
  return handleResponse(res);
}

// POST create item
async function createItem(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// PUT update item
async function updateItem(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// DELETE item
async function deleteItem(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// Export for React (modules)
export { fetchList, createItem, updateItem, deleteItem };

// Also attach to window for non-module usage
window.API = { fetchList, createItem, updateItem, deleteItem };