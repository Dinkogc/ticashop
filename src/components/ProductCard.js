import React from "react";

function ProductCard({ name, price }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Precio: ${price}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;