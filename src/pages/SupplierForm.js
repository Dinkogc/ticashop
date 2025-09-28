import React from "react";

function SupplierForm() {
  return (
    <div>
      <h2>Registrar Proveedor</h2>
      <form>
        <label>Nombre: <input type="text" /></label><br />
        <label>Email: <input type="email" /></label><br />
        <label>Teléfono: <input type="text" /></label><br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default SupplierForm;