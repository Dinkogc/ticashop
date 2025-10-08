import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { load, save } from "../lib/store";

export default function Suppliers({ user }) {
  const [suppliers, setSuppliers] = useState(load("ticashop_suppliers", []));

  useEffect(() => save("ticashop_suppliers", suppliers), [suppliers]);

  function remove(id) {
    if (user?.role !== "administrador") {
      alert("Solo los administradores pueden eliminar proveedores.");
      return;
    }
    if (!window.confirm("¿Eliminar proveedor?")) return;
    setSuppliers(suppliers.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div className="page-header">
        <h2>Proveedores</h2>
        {(user?.role === "administrador" || user?.role === "operario") && (
          <Link to="/suppliers/new" className="btn-primary">
            + Nuevo proveedor
          </Link>
        )}
      </div>

      {suppliers.length === 0 ? (
        <div className="empty-message">No hay proveedores registrados</div>
      ) : (
        <div className="product-list">
          {suppliers.map((s) => (
            <div className="product-card" key={s.id}>
              <h3>{s.name}</h3>
              <div className="product-info">
                <div><strong>RUT:</strong> {s.rut || "—"}</div>
                <div><strong>Email:</strong> {s.email || "—"}</div>
                <div><strong>Teléfono:</strong> {s.phone || "—"}</div>
                <div><strong>Dirección:</strong> {s.address || "—"}</div>
                <div><strong>Categoría:</strong> {s.category || "—"}</div>
                <div><strong>Fecha de registro:</strong> {s.date || "—"}</div>
              </div>

              <div className="card-actions">
                <Link to={`/suppliers/edit/${s.id}`} className="link">✏️ Editar</Link>
                {user?.role === "administrador" && (
                  <button onClick={() => remove(s.id)} className="danger">
                    🗑️ Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}