import React from 'react';
import './style.css';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.title} />
      <div className="product-title">{product.title}</div>
      <div className="product-price">${product.price}</div>
      <div className="product-description">{product.description}</div>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
