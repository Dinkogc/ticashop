import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { save } from "../lib/store";

export default function Login({ onLogin }) {
  const [name, setName] = useState("Operario");
  const [role, setRole] = useState("operario");
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    const user = { name, role };
    save("ticashop_user", user);
    onLogin(user);
    nav("/");
  }

  return (
    <div className="card login-card">
      <h2>Ingresar a TiCaShop</h2>
      <form onSubmit={submit}>
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Rol</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="operario">Operario</option>
          <option value="administrador">Administrador</option>
        </select>

        <div style={{ textAlign: "right" }}>
          <button type="submit" className="primary">Entrar</button>
        </div>
      </form>
    </div>
  );
}