import React, { useState } from "react";
import { load, save } from "../lib/store";

export default function Inventory({ user }) {
  const products = load("ticashop_products", []);
  const suppliers = load("ticashop_suppliers", []);
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || "");
  const [qty, setQty] = useState(1);
  const [entries, setEntries] = useState(load("ticashop_entries", []));

  function submit(e) {
    e.preventDefault();
    if (!productId) return alert("Seleccione producto");
    const entry = { id: Date.now().toString(), productId, supplierId, qty: Number(qty), date: new Date().toISOString() };
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    save("ticashop_entries", newEntries);

    // actualizar stock
    const prods = products.map(p => p.id === productId ? { ...p, stock: (Number(p.stock) || 0) + Number(qty) } : p);
    save("ticashop_products", prods);

    alert("Ingreso registrado");
  }

  return (
    <div className="grid-2">
      <div className="card">
        <h3>Registrar Ingreso</h3>
        <form onSubmit={submit}>
          <label>Producto</label>
          <select value={productId} onChange={e => setProductId(e.target.value)}>
            <option value="">-- seleccionar --</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <label>Proveedor</label>
          <select value={supplierId} onChange={e => setSupplierId(e.target.value)}>
            <option value="">-- seleccionar --</option>
            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <label>Cantidad</label>
          <input type="number" value={qty} onChange={e => setQty(e.target.value)} />

          <div style={{ textAlign: "right" }}>
            <button className="primary">Registrar</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Historial de Ingresos</h3>
        <ul className="history-list">
          {entries.length === 0 && <li className="muted">No hay ingresos registrados</li>}
          {entries.map(en => (
            <li key={en.id} className="history-item">
              <div className="muted">{new Date(en.date).toLocaleString()}</div>
              <div>Producto: {products.find(p => p.id === en.productId)?.name || en.productId}</div>
              <div>Cantidad: {en.qty}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}