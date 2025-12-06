import React, { useState } from "react";

export default function Suppliers({
  suppliers = [],
  setSuppliers = () => {},
  recentSuppliers = [],
  setRecentSuppliers = () => {}
}) {
  const [supplierId, setSupplierId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [search, setSearch] = useState("");

  // Edit state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ supplierId: "", name: "", email: "", contact: "" });

  const addSupplier = () => {
    if (!supplierId || !name || !email || !contact) return alert("Please fill all fields!");

    const newSupplier = { supplierId, name, email, contact };
    setSuppliers([...suppliers, newSupplier]);
    setRecentSuppliers([newSupplier, ...recentSuppliers]);

    setSupplierId(""); setName(""); setEmail(""); setContact("");
  };

  const openEdit = (index) => {
    const s = suppliers[index];
    if (!s) return;
    setEditingIndex(index);
    setEditForm({ supplierId: s.supplierId, name: s.name, email: s.email || "", contact: s.contact || "" });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm({ supplierId: "", name: "", email: "", contact: "" });
  };

  const saveEdit = (e) => {
    e?.preventDefault?.();
    if (editingIndex == null) return;
    if (!editForm.supplierId || !editForm.name || !editForm.email || !editForm.contact) return alert("Please fill all fields!");

    const updatedSupplier = {
      supplierId: editForm.supplierId,
      name: editForm.name,
      email: editForm.email,
      contact: editForm.contact
    };

    const updatedSuppliers = suppliers.map((s, i) => (i === editingIndex ? updatedSupplier : s));
    setSuppliers(updatedSuppliers);

    // update recentSuppliers that match original supplierId
    setRecentSuppliers(prev => prev.map(r => (r.supplierId === suppliers[editingIndex].supplierId ? updatedSupplier : r)));

    cancelEdit();
  };

  const deleteSupplier = (index) => {
    if (!confirm("Delete this supplier?")) return;
    const removed = suppliers[index];
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
    setRecentSuppliers(prev => prev.filter(r => r.supplierId !== removed.supplierId));
    if (editingIndex === index) cancelEdit();
  };

  const filteredSuppliers = suppliers.filter(s => s.supplierId?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container">
      <h1 className="hero-title">Suppliers</h1>

      {/* Add / Edit Form */}
      <div className="glass" style={{ padding: "20px", marginBottom: "24px" }}>
        {editingIndex == null ? (
          <>
            <div className="form-row">
              <input placeholder="Supplier ID" value={supplierId} onChange={e => setSupplierId(e.target.value)} />
              <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} />
              <button className="btn" onClick={addSupplier}>Add</button>
            </div>
            <div className="form-row" style={{ marginTop: 12 }}>
              <input placeholder="Search by Supplier ID" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </>
        ) : (
          <form onSubmit={saveEdit} className="form-row" style={{ gap: 8 }}>
            <input placeholder="Supplier ID" value={editForm.supplierId} onChange={e => setEditForm({ ...editForm, supplierId: e.target.value })} />
            <input placeholder="Name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
            <input type="email" placeholder="Email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
            <input placeholder="Contact" value={editForm.contact} onChange={e => setEditForm({ ...editForm, contact: e.target.value })} />
            <button className="btn" type="submit">Save</button>
            <button type="button" className="btn" onClick={cancelEdit}>Cancel</button>
          </form>
        )}
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px", overflowX: "auto" }}>
        <table className="product-table">
          <thead>
            <tr><th>Supplier ID</th><th>Name</th><th>Email</th><th>Contact</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? filteredSuppliers.map((s, i) => {
              const origIndex = suppliers.indexOf(s);
              return (
                <tr key={origIndex}>
                  <td>{s.supplierId}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.contact}</td>
                  <td className="actions">
                    <button className="edit btn" onClick={() => openEdit(origIndex)}>Edit</button>
                    <button className="delete btn" onClick={() => deleteSupplier(origIndex)}>Delete</button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="5" style={{ textAlign: "center", color: "#ff4b4b" }}>No suppliers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Recently Added */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px" }}>
        <h2>Recently Added Suppliers</h2>
        {recentSuppliers.length > 0 ? recentSuppliers.map((s, i) => (
          <p key={i}>{s.supplierId} — {s.name} | {s.email} | {s.contact}</p>
        )) : <p style={{ color: "#9db0c0" }}>No suppliers added yet.</p>}
      </div>
    </div>
  );
}