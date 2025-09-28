import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { load, save } from "../lib/store";

function uid() { return Math.random().toString(36).slice(2,9); }

export default function ProductForm({ user }) {
  const { id } = useParams();
  const products = load("ticashop_products", []);
  const suppliers = load("ticashop_suppliers", []);
  const existing = products.find(p => p.id === id);
  const [code, setCode] = useState(existing?.code || `PRD-${Date.now().toString().slice(-5)}`);
  const [name, setName] = useState(existing?.name || "");
  const [stock, setStock] = useState(existing?.stock || 0);
  const [supplierId, setSupplierId] = useState(existing?.supplierId || (suppliers[0]?.id || ""));
  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  function submit(e) {
    e.preventDefault();
    const item = { id: existing?.id || uid(), code, name, stock: Number(stock), supplierId };
    const newList = existing ? products.map(p => p.id === existing.id ? item : p) : [item, ...products];
    save("ticashop_products", newList);
    nav("/products");
  }

  return (
    <div className="card max-w">
      <h2>{existing ? "Editar producto" : "Nuevo producto"}</h2>
      <form onSubmit={submit}>
        <label>Código</label>
        <input value={code} onChange={e => setCode(e.target.value)} />

        <label>Nombre</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Proveedor</label>
        <select value={supplierId} onChange={e => setSupplierId(e.target.value)}>
          <option value="">-- ninguno --</option>
          {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <label>Stock inicial</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} />

        <div style={{ textAlign: "right" }}>
          <button className="primary">Guardar</button>
        </div>
      </form>
    </div>
  );
}