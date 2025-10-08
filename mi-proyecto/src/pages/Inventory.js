import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { load, save } from "../lib/store";

export default function Inventory({ user }) {
  const [ingresos, setIngresos] = useState(load("ticashop_inventory", []));
  const proveedores = load("ticashop_suppliers", []);
  const productos = load("ticashop_products", []);

  useEffect(() => save("ticashop_inventory", ingresos), [ingresos]);

  function remove(id) {
    if (user?.role !== "administrador") {
      alert("Solo administradores pueden eliminar ingresos.");
      return;
    }
    if (!window.confirm("¿Eliminar ingreso de inventario?")) return;

    const ingresosActuales = load("ticashop_inventory", []);
    const productosActuales = load("ticashop_products", []);
    const ingreso = ingresosActuales.find((i) => i.id === id);

    if (ingreso) {
      const producto = productosActuales.find((p) => p.id === ingreso.productId);
      if (producto) {
        producto.stock = Math.max((producto.stock || 0) - Number(ingreso.cantidad), 0);
      }
    }

    save("ticashop_products", productosActuales);
    save("ticashop_inventory", ingresosActuales.filter((i) => i.id !== id));
    setIngresos(ingresosActuales.filter((i) => i.id !== id));
  }

  function getProveedorName(id) {
    return proveedores.find((p) => p.id === id)?.name || "—";
  }

  function getProductName(id) {
    return productos.find((p) => p.id === id)?.name || "—";
  }

  return (
    <div>
      <div className="page-header">
        <h2>Inventario</h2>
        {(user?.role === "administrador" || user?.role === "operario") && (
          <Link to="/inventory/new" className="btn-primary">
            + Nuevo ingreso
          </Link>
        )}
      </div>

      {ingresos.length === 0 ? (
        <div className="empty-message">No hay ingresos registrados</div>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((i) => (
              <tr key={i.id}>
                <td>{getProductName(i.productId)}</td>
                <td>{i.categoria}</td>
                <td>{getProveedorName(i.proveedorId)}</td>
                <td>{i.descripcion}</td>
                <td>{i.cantidad}</td>
                <td>${Number(i.precio).toLocaleString()}</td>
                <td>${Number(i.total).toLocaleString()}</td>
                <td>{i.fecha}</td>
                <td>
                  <Link to={`/inventory/edit/${i.id}`} className="link">
                    Editar
                  </Link>{" "}
                  |{" "}
                  {user?.role === "administrador" && (
                    <button
                      onClick={() => remove(i.id)}
                      className="danger"
                      style={{ padding: "4px 8px" }}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}