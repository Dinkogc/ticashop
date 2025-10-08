import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { load, save } from "../lib/store";

export default function InventoryForm({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const ingresos = load("ticashop_inventory", []);
  const productos = load("ticashop_products", []);
  const proveedores = load("ticashop_suppliers", []);

  const existing = ingresos.find((i) => i.id === id);

  const [form, setForm] = useState(
    existing || {
      id: crypto.randomUUID(),
      productId: "",
      categoria: "",
      proveedorId: "",
      descripcion: "",
      cantidad: 1,
      precio: 0,
      total: 0,
      fecha: "",
    }
  );

  // Calcular total automáticamente
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      total: (Number(prev.cantidad) || 0) * (Number(prev.precio) || 0),
    }));
  }, [form.cantidad, form.precio]);

  // Manejo de inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Guardar y actualizar stock
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.productId) {
      alert("Debe seleccionar un producto");
      return;
    }

    const productosActualizados = [...productos];
    const producto = productosActualizados.find((p) => p.id === form.productId);

    if (!producto) {
      alert("Producto no encontrado");
      return;
    }

    let nuevosIngresos;

    if (existing) {
      // Si estamos editando, revertimos el stock anterior antes de actualizar
      const ingresoAnterior = ingresos.find((i) => i.id === id);
      if (ingresoAnterior && ingresoAnterior.productId === producto.id) {
        producto.stock = (producto.stock || 0) - Number(ingresoAnterior.cantidad);
      }
      nuevosIngresos = ingresos.map((i) => (i.id === id ? form : i));
    } else {
      nuevosIngresos = [...ingresos, form];
    }

    // Aumentar el stock con el nuevo ingreso
    producto.stock = (producto.stock || 0) + Number(form.cantidad);

    // Guardar cambios
    save("ticashop_products", productosActualizados);
    save("ticashop_inventory", nuevosIngresos);

    navigate("/inventory");
  }

  return (
    <div className="card">
      <h2>{existing ? "Editar ingreso de inventario" : "Registrar nuevo ingreso"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Producto</label>
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccionar producto --</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label>Categoría / Tipo de ingreso</label>
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Ej: Compra, Devolución..."
          required
        />

        <label>Proveedor asociado</label>
        <select
          name="proveedorId"
          value={form.proveedorId}
          onChange={handleChange}
        >
          <option value="">-- Seleccionar proveedor --</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Ej: Ingreso de nuevos productos"
        />

        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Precio unitario</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <label>Total (automático)</label>
        <input type="number" name="total" value={form.total} readOnly />

        <label>Fecha del ingreso</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />

        <div style={{ textAlign: "right", marginTop: "15px" }}>
          <button className="btn-primary">
            {existing ? "Guardar cambios" : "Registrar ingreso"}
          </button>
        </div>
      </form>
    </div>
  );
}