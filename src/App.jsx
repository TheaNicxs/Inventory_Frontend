// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";

export default function App() {
  // application-wide state (persisted)
  const [products, setProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("products")) || []; } catch { return []; }
  });
  const [recentProducts, setRecentProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recentProducts")) || []; } catch { return []; }
  });

  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem("orders")) || []; } catch { return []; }
  });
  const [recentOrders, setRecentOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recentOrders")) || []; } catch { return []; }
  });

  const [suppliers, setSuppliers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("suppliers")) || []; } catch { return []; }
  });
  const [recentSuppliers, setRecentSuppliers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recentSuppliers")) || []; } catch { return []; }
  });

  // persist
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

  return (
    <BrowserRouter>
      <Header />
      <main style={{ minHeight: "calc(100vh - 160px)" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                recentProducts={recentProducts}
                orders={orders}
                recentOrders={recentOrders}
                suppliers={suppliers}
                recentSuppliers={recentSuppliers}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                setProducts={setProducts}
                recentProducts={recentProducts}
                setRecentProducts={setRecentProducts}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders
                orders={orders}
                setOrders={setOrders}
                recentOrders={recentOrders}
                setRecentOrders={setRecentOrders}
              />
            }
          />
          <Route
            path="/suppliers"
            element={
              <Suppliers
                suppliers={suppliers}
                setSuppliers={setSuppliers}
                recentSuppliers={recentSuppliers}
                setRecentSuppliers={setRecentSuppliers}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}