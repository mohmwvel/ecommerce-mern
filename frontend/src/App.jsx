import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './style.css';

const products = [
  {
    id: 1,
    title: 'Google Pixel 8 Pro',
    type: 'Phone',
    brand: 'Google',
    price: 999.99,
    description: 'The latest Google flagship with an advanced camera and AI features.',
    image: 'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=400&q=80', // Modern smartphone
    rating: 4.8,
    reviews: 87,
    stock: 8,
    badge: 'New',
  },
  {
    id: 2,
    title: 'Samsung Galaxy Buds2 Pro',
    type: 'Earbuds',
    brand: 'Samsung',
    price: 229.99,
    description: 'Premium wireless earbuds with intelligent ANC and immersive sound.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80', // White earbuds
    rating: 4.7,
    reviews: 64,
    stock: 15,
    badge: '',
  },
  {
    id: 3,
    title: 'Dell UltraSharp 34" Curved Monitor',
    type: 'Monitor',
    brand: 'Dell',
    price: 1199.99,
    description: 'Immersive 34-inch curved WQHD monitor for multitasking and entertainment.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', // Curved monitor
    rating: 4.9,
    reviews: 45,
    stock: 5,
    badge: 'Best Seller',
  },
  {
    id: 4,
    title: 'Apple iPad Air (2024)',
    type: 'Tablet',
    brand: 'Apple',
    price: 699.99,
    description: 'Lightweight, powerful tablet with M2 chip and Liquid Retina display.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', // iPad/tablet
    rating: 4.8,
    reviews: 73,
    stock: 10,
    badge: '',
  }
];

const categories = [
  'All',
  ...Array.from(new Set(products.map(p => p.type)))
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState('');
  const [showAd, setShowAd] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

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

  // Filter products by category and search
  const filteredProducts = products.filter(p =>
    (category === 'All' || p.type === category) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

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
        <div className="product-filters">
          <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="category-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <div style={{gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.2rem'}}>No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          )}
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
