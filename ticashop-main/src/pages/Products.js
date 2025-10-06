import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { load, save } from "../lib/store";

export default function Products({ user }) {
  const [products, setProducts] = useState(load("ticashop_products", []));

  useEffect(() => save("ticashop_products", products), [products]);

  function remove(id) {
    if (user?.role !== "administrador") {
      alert("Solo administradores pueden eliminar productos.");
      return;
    }
    if (!window.confirm("Eliminar producto?")) return;
    setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="page-header">
        <h2>Productos</h2>
        {(user?.role === "administrador" || user?.role === "operario") && (
          <Link to="/products/new" className="btn">Nuevo producto</Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="empty-message">No hay productos registrados</div>
      ) : (
        <div className="product-list">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <h3>{p.name}</h3>
              <div>Código: {p.code}</div>
              <div>Stock: {p.stock || 0}</div>
              <div className="card-actions">
                <Link to={`/products/edit/${p.id}`} className="link">Editar</Link>
                <button onClick={() => remove(p.id)} className="danger">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}