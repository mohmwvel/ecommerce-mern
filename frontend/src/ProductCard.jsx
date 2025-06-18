import React from 'react';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} width="100%" />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
