import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(){
  return (
    <header className="header">
      <div className="brand">Esports Inventory</div>
      <nav className="nav">
        <NavLink to="/" end className={({isActive})=>isActive?'active':''}>Home</NavLink>
        <NavLink to="/products" className={({isActive})=>isActive?'active':''}>Products</NavLink>
        <NavLink to="/suppliers" className={({isActive})=>isActive?'active':''}>Suppliers</NavLink>
        <NavLink to="/orders" className={({isActive})=>isActive?'active':''}>Orders</NavLink>
      </nav>
    </header>
  );
}
