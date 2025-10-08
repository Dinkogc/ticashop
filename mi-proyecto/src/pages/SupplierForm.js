import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { load, save } from "../lib/store";

export default function SupplierForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [suppliers, setSuppliers] = useState(load("ticashop_suppliers", []));
  const editing = Boolean(id);
  const existing = suppliers.find((s) => s.id === id);

  const [form, setForm] = useState(
    existing || {
      id: crypto.randomUUID(),
      name: "",
      rut: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      date: "",
    }
  );

  useEffect(() => {
    save("ticashop_suppliers", suppliers);
  }, [suppliers]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name) return alert("Por favor, ingrese el nombre del proveedor.");

    const updatedList = editing
      ? suppliers.map((s) => (s.id === id ? form : s))
      : [...suppliers, form];

    setSuppliers(updatedList);
    save("ticashop_suppliers", updatedList);
    navigate("/suppliers");
  }

  return (
    <div className="card">
      <h2>{editing ? "Editar proveedor" : "Nuevo proveedor"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre del proveedor</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>RUT</label>
        <input
          type="text"
          name="rut"
          value={form.rut}
          onChange={handleChange}
          placeholder="12.345.678-9"
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="proveedor@correo.com"
        />

        <label>Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+56 9 1234 5678"
        />

        <label>Dirección</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Av. Siempre Viva 742"
        />

        <label>Rubro / Categoría</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Tecnología, papelería, limpieza..."
        />

        <label>Fecha de registro</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary">
          {editing ? "Guardar cambios" : "Registrar proveedor"}
        </button>
      </form>
    </div>
  );
}