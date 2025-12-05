import React, { useState, useEffect } from "react";
import Products from "./Products";
import Orders from "./Orders";
import Suppliers from "./Suppliers";
import Home from "./Home";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Load from localStorage or default to empty arrays
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("products")) || []);
  const [recentProducts, setRecentProducts] = useState(() => JSON.parse(localStorage.getItem("recentProducts")) || []);

  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("orders")) || []);
  const [recentOrders, setRecentOrders] = useState(() => JSON.parse(localStorage.getItem("recentOrders")) || []);

  const [suppliers, setSuppliers] = useState(() => JSON.parse(localStorage.getItem("suppliers")) || []);
  const [recentSuppliers, setRecentSuppliers] = useState(() => JSON.parse(localStorage.getItem("recentSuppliers")) || []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
  }, [products, recentProducts]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("recentOrders", JSON.stringify(recentOrders));
  }, [orders, recentOrders]);

  useEffect(() => {
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    localStorage.setItem("recentSuppliers", JSON.stringify(recentSuppliers));
  }, [suppliers, recentSuppliers]);

  // Simple navigation
  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return <Products
          products={products} setProducts={setProducts}
          recentProducts={recentProducts} setRecentProducts={setRecentProducts}
        />;
      case "orders":
        return <Orders
          orders={orders} setOrders={setOrders}
          recentOrders={recentOrders} setRecentOrders={setRecentOrders}
        />;
      case "suppliers":
        return <Suppliers
          suppliers={suppliers} setSuppliers={setSuppliers}
          recentSuppliers={recentSuppliers} setRecentSuppliers={setRecentSuppliers}
        />;
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