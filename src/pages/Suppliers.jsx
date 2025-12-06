import React, { useState } from "react";

export default function Suppliers({ suppliers = [], setSuppliers = () => {}, recentSuppliers = [], setRecentSuppliers = () => {} }) {
  const [supplierId, setSupplierId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [search, setSearch] = useState("");

  const addSupplier = () => {
    if (!supplierId || !name || !email || !contact) return alert("Please fill all fields!");

    const newSupplier = { supplierId, name, email, contact };
    setSuppliers([...suppliers, newSupplier]);
    setRecentSuppliers([newSupplier, ...recentSuppliers]);

    setSupplierId("");
    setName("");
    setEmail("");
    setContact("");
  };

  const filteredSuppliers = suppliers.filter(s => s.supplierId.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container">
      <h1 className="hero-title">Suppliers</h1>

      {/* Form */}
      <div className="glass" style={{ padding: "20px", marginBottom: "24px" }}>
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
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px", overflowX: "auto" }}>
        <table className="product-table">
          <thead>
            <tr><th>Supplier ID</th><th>Name</th><th>Email</th><th>Contact</th></tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? filteredSuppliers.map((s, i) => (
              <tr key={i}><td>{s.supplierId}</td><td>{s.name}</td><td>{s.email}</td><td>{s.contact}</td></tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#ff4b4b" }}>No suppliers found.</td>
              </tr>
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