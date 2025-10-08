import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Suppliers from "./pages/Suppliers";
import SupplierForm from "./pages/SupplierForm";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import { load, save } from "./lib/store";
import "./App.css";
import InventoryForm from "./pages/InventoryForm";

function App() {
  const [user, setUser] = useState(load("ticashop_user", null));

  useEffect(() => save("ticashop_user", user), [user]);

  return (
    <Router>
      <Header user={user} onLogout={() => setUser(null)} />
      <main>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />

          {/* Productos (CRUD) */}
          <Route path="/products" element={user ? <Products user={user} /> : <Navigate to="/login" />} />
          <Route path="/products/new" element={user ? <ProductForm user={user} /> : <Navigate to="/login" />} />
          <Route path="/products/edit/:id" element={user ? <ProductForm user={user} /> : <Navigate to="/login" />} />

          {/* Proveedores (CRUD) */}
          <Route path="/suppliers" element={user ? <Suppliers user={user} /> : <Navigate to="/login" />} />
          <Route path="/suppliers/new" element={user ? <SupplierForm user={user} /> : <Navigate to="/login" />} />
          <Route path="/suppliers/edit/:id" element={user ? <SupplierForm user={user} /> : <Navigate to="/login" />} />

          {/* Inventario / historial de ingresos */}
          <Route path="/inventory" element={user ? <Inventory user={user} /> : <Navigate to="/login" />} />
          <Route path="/inventory/new" element={<InventoryForm user={user} />} />
<Route path="/inventory/edit/:id" element={<InventoryForm user={user} />} />

          {/* Reportes */}
          <Route path="/reports" element={user ? <Reports user={user} /> : <Navigate to="/login" />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;