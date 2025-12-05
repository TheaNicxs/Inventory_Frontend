import React, { useState } from "react";

export default function Orders({ orders, setOrders, recentOrders, setRecentOrders }) {
  const [orderId, setOrderId] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  const addOrder = () => {
    if (!orderId || !product || !quantity || !price) return alert("Please fill all fields!");

    const newOrder = { orderId, product, quantity: Number(quantity), price: Number(price) };
    setOrders([...orders, newOrder]);
    setRecentOrders([newOrder, ...recentOrders]);

    setOrderId(""); setProduct(""); setQuantity(""); setPrice("");
  };

  const filteredOrders = orders.filter(o => o.orderId.toLowerCase().includes(search.toLowerCase()));
  const totalValue = orders.reduce((sum, o) => sum + o.quantity * o.price, 0);

  return (
    <div className="page-container">
      <h1 className="hero-title">Orders</h1>

      {/* Form */}
      <div className="glass" style={{ padding: "20px", marginBottom: "24px" }}>
        <div className="form-row">
          <input placeholder="Order ID" value={orderId} onChange={e => setOrderId(e.target.value)} />
          <input placeholder="Product" value={product} onChange={e => setProduct(e.target.value)} />
          <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
          <button className="btn" onClick={addOrder}>Add</button>
        </div>
        <div className="form-row">
          <input placeholder="Search by Order ID" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px", overflowX: "auto" }}>
        <table className="product-table">
          <thead>
            <tr><th>Order ID</th><th>Product</th><th>Quantity</th><th>Price</th></tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? filteredOrders.map((o,i)=>(
              <tr key={i}><td>{o.orderId}</td><td>{o.product}</td><td>{o.quantity}</td><td>{o.price}</td></tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#ff4b4b" }}>No orders found.</td>
              </tr>
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
        {recentOrders.length > 0 ? recentOrders.map((o,i)=>(
          <p key={i}>{o.orderId} — {o.product} ({o.quantity} pcs) | ₱{o.price}</p>
        )) : <p style={{ color: "#9db0c0" }}>No orders added yet.</p>}
      </div>
    </div>
  );
}