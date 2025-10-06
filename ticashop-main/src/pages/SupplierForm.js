import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { load, save } from "../lib/store";

export default function SupplierForm({ user }) {
  const { id } = useParams(); // Si hay ID, estamos en edición
  const navigate = useNavigate();
  const suppliers = load("ticashop_suppliers", []);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  // Si estamos editando, cargamos el proveedor automáticamente
  useEffect(() => {
    if (id) {
      const supplier = suppliers.find((s) => s.id === id);
      if (supplier) {
        setName(supplier.name);
        setContact(supplier.contact);
      }
    }
  }, [id, suppliers]);

  function submit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    let updatedSuppliers;

    if (id) {
      // Editar
      updatedSuppliers = suppliers.map((s) =>
        s.id === id ? { ...s, name, contact } : s
      );
      alert("Proveedor actualizado correctamente");
    } else {
      // Crear
      const newSupplier = { id: Date.now().toString(), name, contact };
      updatedSuppliers = [newSupplier, ...suppliers];
      alert("Proveedor registrado correctamente");
    }

    save("ticashop_suppliers", updatedSuppliers);
    navigate("/suppliers");
  }

  return (
    <div className="card login-card">
      <h2>{id ? "Editar Proveedor" : "Registrar Proveedor"}</h2>
      <form onSubmit={submit}>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Contacto (Email o Teléfono):</label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />

        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <button className="primary">{id ? "Actualizar" : "Guardar"}</button>
        </div>
      </form>
    </div>
  );
}