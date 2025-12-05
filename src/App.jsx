import React, { useState } from "react";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Home from "./pages/Home.jsx";

// Simple navigation for demo purposes
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Shared states
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const [orders, setOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [suppliers, setSuppliers] = useState([]);
  const [recentSuppliers, setRecentSuppliers] = useState([]);

  // Simple navigation
  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return <Products products={products} setProducts={setProducts} recentProducts={recentProducts} setRecentProducts={setRecentProducts} />;
      case "orders":
        return <Orders orders={orders} setOrders={setOrders} recentOrders={recentOrders} setRecentOrders={setRecentOrders} />;
      case "suppliers":
        return <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} recentSuppliers={recentSuppliers} setRecentSuppliers={setRecentSuppliers} />;
      default:
        return <Home
          products={products} recentProducts={recentProducts}
          orders={orders} recentOrders={recentOrders}
          suppliers={suppliers} recentSuppliers={recentSuppliers}
        />;
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav style={{ padding: "12px", display: "flex", gap: "12px" }}>
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("products")}>Products</button>
        <button onClick={() => setCurrentPage("orders")}>Orders</button>
        <button onClick={() => setCurrentPage("suppliers")}>Suppliers</button>
      </nav>

      {renderPage()}
    </div>
  );
}