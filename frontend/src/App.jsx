import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './style.css';

const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 59.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 129.99,
    description: 'Track your fitness and notifications with this smart watch.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    price: 39.99,
    description: 'Portable Bluetooth speaker with deep bass and long battery life.',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'DSLR Camera',
    price: 499.99,
    description: 'Capture stunning photos with this high-resolution DSLR camera.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState('');
  const [showAd, setShowAd] = useState(true);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        setToast('Increased quantity in cart!');
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        setToast('Added to cart!');
        return [...prev, { ...product, qty: 1 }];
      }
    });
    setTimeout(() => setToast(''), 1800);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <header className="header">
        <span className="header-title">🛒 ShinShop</span>
        <button className="header-cart-btn" onClick={() => setShowCart(true)}>
          Cart
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>
      {showAd && (
        <div className="ad-banner">
          <span className="ad-text">🎉 Summer Sale! Get up to <b>50% OFF</b> on select items. Use code <b>SHIN50</b> at checkout!</span>
          <button className="ad-close" onClick={() => setShowAd(false)}>&times;</button>
        </div>
      )}
      <div className="app-container">
        <h1>Featured Products</h1>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        {showCart && (
          <div className="cart-modal">
            <div className="cart-content">
              <button className="close-btn" onClick={() => setShowCart(false)}>&times;</button>
              <h2>Your Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-info">
                        <span>{item.title}</span>
                        <span>Qty: {item.qty}</span>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="cart-total">Total: ${total.toFixed(2)}</div>
            </div>
          </div>
        )}
        {toast && <div className="toast">{toast}</div>}
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} ShinShop. All rights reserved.
      </footer>
    </>
  );
}
