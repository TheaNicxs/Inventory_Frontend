import React, { useState } from "react";

export default function Products({ products = [], setProducts = () => {}, recentProducts = [], setRecentProducts = () => {} }) {
  const [sku, setSku] = useState("");
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  // Deduct form state
  const [deductIndex, setDeductIndex] = useState("");
  const [deductQty, setDeductQty] = useState(1);

  const addProduct = () => {
    if (!sku || !productName || !stock || !price) return alert("Please fill all fields!");

    const newProduct = { sku, name: productName, stock: Number(stock), price: Number(price) };

    setProducts([...products, newProduct]);
    setRecentProducts([newProduct, ...recentProducts]);

    setSku(""); setProductName(""); setStock(""); setPrice("");
  };

  // Deduct stock handler
  const handleDeduct = (e) => {
    e?.preventDefault?.();
    if (deductIndex === "" || deductIndex == null) return alert("Please select a product to deduct from.");
    const idx = Number(deductIndex);
    if (isNaN(idx) || idx < 0 || idx >= products.length) return alert("Invalid product selected.");
    const qty = Number(deductQty);
    if (isNaN(qty) || qty <= 0) return alert("Enter a positive quantity to deduct.");

    const target = products[idx];
    const newStock = Math.max(0, Number(target.stock || 0) - qty);
    const updated = { ...target, stock: newStock };

    const updatedProducts = products.map((p, i) => (i === idx ? updated : p));
    setProducts(updatedProducts);

    // If recently added contains this sku, update it as well
    const updatedRecent = recentProducts.map(p => p.sku === updated.sku ? updated : p);
    setRecentProducts(updatedRecent);

    // reset deduct form
    setDeductIndex("");
    setDeductQty(1);
  };

  const filteredProducts = products.filter(p => p.sku?.toLowerCase().includes(search.toLowerCase()));
  const totalValue = products.reduce((sum, p) => sum + (Number(p.stock || 0) * Number(p.price || 0)), 0);

  return (
    <div className="page-container">
      <h1 className="hero-title">Products</h1>

      {/* Form */}
      <div className="glass" style={{ padding: "20px", marginBottom: "24px" }}>
        <div className="form-row">
          <input placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} />
          <input placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} />
          <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
          <button className="btn" onClick={addProduct}>Add</button>
        </div>
        <div className="form-row" style={{ marginTop: 12 }}>
          <input placeholder="Search by SKU" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: "16px", marginBottom: "24px", overflowX: "auto" }}>
        <table className="product-table">
          <thead>
            <tr><th>SKU</th><th>Product</th><th>Stock</th><th>Price</th></tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? filteredProducts.map((p,i)=>(
              <tr key={i}><td>{p.sku}</td><td>{p.name}</td><td>{p.stock}</td><td>{p.price}</td></tr>
            )) : <tr><td colSpan="4" style={{ textAlign:"center", color:"#ff4b4b" }}>No products found.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="glass" style={{ padding:"16px", marginBottom:"24px" }}>
        <p><strong>Total Inventory Value:</strong> ₱{totalValue}</p>
      </div>

      <div className="glass" style={{ padding:"16px", marginBottom:"24px" }}>
        <h2>Recently Added</h2>
        {recentProducts.length > 0 ? recentProducts.map((p,i)=>(
          <p key={i}>{p.sku} — {p.name} ({p.stock} pcs) | ₱{p.price}</p>
        )) : <p style={{ color:"#9db0c0" }}>No products added yet.</p>}
      </div>

      {/* Deduct Stock */}
      <hr style={{ margin:'18px 0' }}/>
      <div className="glass" style={{ padding: "16px", marginBottom: "24px" }}>
        <h3>Deduct Stock</h3>
        <form onSubmit={handleDeduct} className="form-row">
          <select value={deductIndex} onChange={e => setDeductIndex(e.target.value)}>
            <option value="">Select product</option>
            {products.map((p, i) => (
              <option key={i} value={i}>{p.sku} — {p.name} (Stock: {p.stock})</option>
            ))}
          </select>
          <input type="number" min="1" value={deductQty} onChange={e => setDeductQty(e.target.value)} />
          <button className="btn" type="submit">Deduct</button>
        </form>
        <p style={{ marginTop: 8, color: "#9db0c0" }}>Deduct will not allow stock to go below 0.</p>
      </div>
    </div>
  );
}