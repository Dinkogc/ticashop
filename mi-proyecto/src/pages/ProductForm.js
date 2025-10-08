import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { load, save } from "../lib/store";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function ProductForm({ user }) {
  const { id } = useParams();
  const products = load("ticashop_products", []);
  const suppliers = load("ticashop_suppliers", []);
  const existing = products.find((p) => p.id === id);

  // Campos existentes
  const [code, setCode] = useState(
    existing?.code || `PRD-${Date.now().toString().slice(-5)}`
  );
  const [name, setName] = useState(existing?.name || "");
  const [stock, setStock] = useState(existing?.stock || 0);
  const [supplierId, setSupplierId] = useState(
    existing?.supplierId || (suppliers[0]?.id || "")
  );

  // 🆕 Campos nuevos
  const [category, setCategory] = useState(existing?.category || "");
  const [price, setPrice] = useState(existing?.price || "");
  const [date, setDate] = useState(existing?.date || "");

  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  function submit(e) {
    e.preventDefault();

    const item = {
      id: existing?.id || uid(),
      code,
      name,
      category,
      price: Number(price),
      date,
      stock: Number(stock),
      supplierId,
    };

    const newList = existing
      ? products.map((p) => (p.id === existing.id ? item : p))
      : [item, ...products];

    save("ticashop_products", newList);
    nav("/products");
  }

  return (
    <div className="card max-w">
      <h2>{existing ? "Editar producto" : "Nuevo producto"}</h2>
      <form onSubmit={submit}>
        <label>Código</label>
        <input value={code} onChange={(e) => setCode(e.target.value)} />

        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        {/* 🆕 Categoría */}
        <label>Categoría</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Seleccione --</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Computación">Computación</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Otros">Otros</option>
        </select>

        {/* 🆕 Precio */}
        <label>Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ej: 49990"
        />

        {/* 🆕 Fecha */}
        <label>Fecha de ingreso</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Proveedor</label>
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
        >
          <option value="">-- ninguno --</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label>Stock inicial</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <div style={{ textAlign: "right" }}>
          <button className="primary">Guardar</button>
        </div>
      </form>
    </div>
  );
}