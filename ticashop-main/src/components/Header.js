import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Header({ user, onLogout }) {
  return (
    <header>
      <div className="header-left">
        <img src={Logo} alt="TicaShop" style={{ width: 44, height: 44 }} />
        <h1>TicaShop</h1>
      </div>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/suppliers">Proveedores</Link>
        <Link to="/inventory">Ingresos</Link>
        <Link to="/reports">Reportes</Link>
        {user ? (
          <span className="header-user">
            {user.name} ({user.role})
            <button onClick={onLogout} className="link-button">Cerrar sesión</button>
          </span>
        ) : (
          <Link to="/login">Ingresar</Link>
        )}
      </nav>
    </header>
  );
}