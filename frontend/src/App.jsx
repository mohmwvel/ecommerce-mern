import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <header>
        <h1>🛍️ ShopSmart</h1>
        <p>Cart: {cart.length} items</p>
      </header>
      <main>
        <div className="products">
          {products.map(p => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}
