import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartSidebar from './components/CartSidebar';

const WHATSAPP_NUMBER = '+9647707409507';

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  React.useEffect(() => {
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

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const checkout = () => {
    if (cart.length === 0) return alert('سلتك فارغة!');
    let message = 'مرحباً! أود شراء:\n\n';
    cart.forEach(item => {
      message += `🔹 ${item.name} × ${item.quantity} = ${item.price * item.quantity} د.ع\n`;
    });
    message += `\nالإجمالي: ${cart.reduce((a, b) => a + b.price * b.quantity, 0)} د.ع\n`;
    message += 'طريقة الدفع: نقداً عند الاستلام 💵\n';
    message += 'شكراً! 🌟';
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Router>
      <div className="app-container" style={{ 
        paddingBottom: '70px',
        minHeight: '100vh'
      }}>
        <Routes>
          <Route path="/" element={
            <Home onProductClick={setSelectedProduct} />
          } />
          <Route path="/product" element={
            selectedProduct ? (
              <ProductDetail product={selectedProduct} />
            ) : (
              <Navigate to="/" />
            )
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <CartSidebar
          cart={cart}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          checkout={checkout}
        />

        <button 
          className="open-cart-btn" 
          onClick={() => setCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '60px',
            height: '60px',
            background: '#4a6fa5',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            fontSize: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            zIndex: '100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          🛒 {cart.reduce((a, b) => a + b.quantity, 0)}
        </button>
      </div>
    </Router>
  );
};

export default App;