import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { load, save } from "../lib/store";

export default function Suppliers({ user }) {
  const [list, setList] = useState(load("ticashop_suppliers", []));

  useEffect(() => save("ticashop_suppliers", list), [list]);

  function remove(id) {
    if (user?.role !== "administrador") { alert("Solo administradores pueden eliminar proveedores."); return; }
    if (window.confirm("¿Seguro que quieres eliminar este proveedor?")) return;
    setList(list.filter(i => i.id !== id));
  }

  return (
    <div>
      <div className="page-header">
        <h2>Proveedores</h2>
        <Link to="/suppliers/new" className="btn">Nuevo proveedor</Link>
      </div>

      <div className="card-list">
        {list.map(s => (
          <div key={s.id} className="card">
            <div className="card-title">{s.name}</div>
            <div className="muted">{s.contact}</div>
            <div className="card-actions">
              <Link to={`/suppliers/edit/${s.id}`} className="link">Editar</Link>
              <button onClick={() => remove(s.id)} className="danger">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}