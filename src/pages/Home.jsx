import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import InstallPrompt from '../components/InstallPrompt';

const Home = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories] = useState([
    'إلكترونيات', 
    'اكسسورات', 
    'سماعات', 
    'كيبلات', 
    'شاحنات', 
    'لصقات حماية للشاشة'
  ]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <header>
        <h1>🛍️ GN Store</h1>
        <p>أفضل الإكسسوارات الإلكترونية بأسعار لا تُقاوم 💫</p>
      </header>

      <div className="category-icons">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              background: category === cat ? '#4a6fa5' : '#f0f4f8',
              color: category === cat ? 'white' : '#4a6fa5',
              border: '1px solid #4a6fa5',
              padding: '6px 15px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {cat === 'إلكترونيات' && '📱'}
            {cat === 'اكسسورات' && '🔧'}
            {cat === 'سماعات' && '🎧'}
            {cat === 'كيبلات' && '🔌'}
            {cat === 'شاحنات' && '🔋'}
            {cat === 'لصقات حماية للشاشة' && '🛡️'}
            {cat}
          </button>
        ))}
      </div>

      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">جميع الأقسام</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <main className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              onClick={() => onProductClick(product)} 
            />
          ))
        ) : (
          <p>لا توجد منتجات مطابقة 🙁</p>
        )}
      </main>

      <InstallPrompt />
    </div>
  );
};

export default Home;