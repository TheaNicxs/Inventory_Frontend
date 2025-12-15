import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="brand">Esports Inventory</div>

      {/* Hamburger Button (Mobile) */}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span className={`bar ${open ? "rotate1" : ""}`}></span>
        <span className={`bar ${open ? "hide" : ""}`}></span>
        <span className={`bar ${open ? "rotate2" : ""}`}></span>
      </button>

      {/* Navigation */}
      <nav className={`nav ${open ? "show" : ""}`}>
        <NavLink to="/" end onClick={() => setOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>

        <NavLink to="/products" onClick={() => setOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}>
          Products
        </NavLink>

        <NavLink to="/suppliers" onClick={() => setOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}>
          Suppliers
        </NavLink>

        <NavLink to="/orders" onClick={() => setOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}>
          Orders
        </NavLink>
      </nav>
    </header>
  );
}
