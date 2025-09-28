import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Panel de Control - TicaShop</h2>

      <div className="cards">
        <div className="card">
          <h3>Productos</h3>
          <p>120 en inventario</p>
        </div>

        <div className="card">
          <h3>Ventas</h3>
          <p>350 este mes</p>
        </div>

        <div className="card">
          <h3>Proveedores</h3>
          <p>8 activos</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;