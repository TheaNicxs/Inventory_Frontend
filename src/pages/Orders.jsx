import React, { useState } from "react";

export default function Orders({
  orders = [],
  setOrders = () => {},
  recentOrders = [],
  setRecentOrders = () => {}
}) {
  const [orderId, setOrderId] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  // Edit state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ orderId: "", product: "", quantity: 0, price: 0 });

  const addOrder = () => {
    if (!orderId || !product || !quantity || !price) return alert("Please fill all fields!");

    const newOrder = { orderId, product, quantity: Number(quantity), price: Number(price) };
    setOrders([...orders, newOrder]);
    setRecentOrders([newOrder, ...recentOrders]);

    setOrderId(""); setProduct(""); setQuantity(""); setPrice("");
  };

  const openEdit = (index) => {
    const o = orders[index];
    if (!o) return;
    setEditingIndex(index);
    setEditForm({ orderId: o.orderId, product: o.product, quantity: o.quantity, price: o.price });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm({ orderId: "", product: "", quantity: 0, price: 0 });
  };

  const saveEdit = (e) => {
    e?.preventDefault?.();
    if (editingIndex == null) return;
    if (!editForm.orderId || !editForm.product || editForm.quantity === "" || editForm.price === "") return alert("Please fill all fields!");

    const updatedOrder = {
      orderId: editForm.orderId,
      product: editForm.product,
      quantity: Number(editForm.quantity),
      price: Number(editForm.price)
    };

    const updatedOrders = orders.map((o, i) => (i === editingIndex ? updatedOrder : o));
    setOrders(updatedOrders);

    // update recentOrders that match original orderId
    setRecentOrders(prev => prev.map(r => (r.orderId === orders[editingIndex].orderId ? updatedOrder : r)));

    cancelEdit();
  };

  const deleteOrder = (index) => {
    if (!confirm("Delete this order?")) return;
    const removed = orders[index];
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    setRecentOrders(prev => prev.filter(r => r.orderId !== removed.orderId));
    if (editingIndex === index) cancelEdit();
  };

  const filteredOrders = orders.filter(o => o.orderId?.toLowerCase().includes(search.toLowerCase()));
  const totalValue = orders.reduce((sum, o) => sum + (Number(o.quantity || 0) * Number(o.price || 0)), 0);

  return (
    <div className="page-container">
      <h1 className="hero-title">Orders</h1>

      {/* Add / Edit Form */}
      <div className="glass" style={{ padding: "20px", marginBottom: "24px" }}>
        {editingIndex == null ? (
          <>
            <div className="form-row">
              <input placeholder="Order ID" value={orderId} onChange={e => setOrderId(e.target.value)} />
              <input placeholder="Product" value={product} onChange={e => setProduct(e.target.value)} />
              <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
              <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
              <button className="btn" onClick={addOrder}>Add</button>
            </div>
            <div className="form-row" style={{ marginTop: 12 }}>
              <input placeholder="Search by Order ID" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </>
        ) : (
          <form onSubmit={saveEdit} className="form-row" style={{ gap: 8 }}>
            <input placeholder="Order ID" value={editForm.orderId} onChange={e => setEditForm({ ...editForm, orderId: e.target.value })} />
            <input placeholder="Product" value={editForm.product} onChange={e => setEditForm({ ...editForm, product: e.target.value })} />
            <input type="number" placeholder="Quantity" value={editForm.quantity} onChange={e => setEditForm({ ...editForm, quantity: e.target.value })} />
            <input type="number" placeholder="Price" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
            <button className="btn" type="submit">Save</button>
            <button type="button" className="btn" onClick={cancelEdit}>Cancel</button>
          </form>
        )}
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px", overflowX: "auto" }}>
        <table className="product-table">
          <thead>
            <tr><th>Order ID</th><th>Product</th><th>Quantity</th><th>Price</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? filteredOrders.map((o, i) => {
              const origIndex = orders.indexOf(o);
              return (
                <tr key={origIndex}>
                  <td>{o.orderId}</td>
                  <td>{o.product}</td>
                  <td>{o.quantity}</td>
                  <td>₱{Number(o.price).toFixed(2)}</td>
                  <td className="actions">
                    <button className="edit btn" onClick={() => openEdit(origIndex)}>Edit</button>
                    <button className="delete btn" onClick={() => deleteOrder(origIndex)}>Delete</button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="5" style={{ textAlign: "center", color: "#ff4b4b" }}>No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px" }}>
        <p><strong>Total Order Value:</strong> ₱{totalValue}</p>
      </div>

      {/* Recently Added */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px" }}>
        <h2>Recently Added Orders</h2>
        {recentOrders.length > 0 ? recentOrders.map((o, i) => (
          <p key={i}>{o.orderId} — {o.product} ({o.quantity} pcs) | ₱{o.price}</p>
        )) : <p style={{ color: "#9db0c0" }}>No orders added yet.</p>}
      </div>
    </div>
  );
}