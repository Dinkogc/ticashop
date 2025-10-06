import React from "react";
import { load } from "../lib/store";

export default function Reports() {
  const products = load("ticashop_products", []);
  const entries = load("ticashop_entries", []);

  const totals = entries.reduce((acc, en) => { acc[en.productId] = (acc[en.productId] || 0) + Number(en.qty); return acc; }, {});

  return (
    <div>
      <h2>Reportes</h2>
      <div className="card">
        <table className="report-table">
          <thead>
            <tr><th>Producto</th><th>Stock</th><th>Ingresado (total)</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.stock || 0}</td>
                <td>{totals[p.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}