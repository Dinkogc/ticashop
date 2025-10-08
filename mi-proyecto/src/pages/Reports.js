import React from "react";
import { load } from "../lib/store";

export default function Reports() {
  const productos = load("ticashop_products", []);
  const ingresos = load("ticashop_inventory", []);

  // Calcular total ingresado por producto
  const reportes = productos.map((p) => {
    const totalIngresado = ingresos
      .filter((i) => i.productId === p.id)
      .reduce((sum, i) => sum + Number(i.cantidad || 0), 0);

    return {
      nombre: p.name,
      stock: p.stock || 0,
      totalIngresado,
    };
  });

  return (
    <div>
      <div className="page-header">
        <h2>📊 Reportes de Inventario</h2>
      </div>

      {reportes.length === 0 ? (
        <div className="empty-message">No hay datos disponibles</div>
      ) : (
        <div className="report-container">
          <table className="report-table improved">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock actual</th>
                <th>Ingresado (total)</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((r, i) => (
                <tr key={i}>
                  <td>{r.nombre}</td>
                  <td>{r.stock}</td>
                  <td>{r.totalIngresado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}