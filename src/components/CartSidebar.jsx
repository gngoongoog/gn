import React from 'react';

const CartSidebar = ({ cart, isOpen, onClose, removeFromCart, updateQuantity, checkout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-cart" onClick={onClose}>×</button>
      <h2>🛒 سلة الشراء</h2>
      {cart.length === 0 ? (
        <p>سلتك فارغة 😔</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <div className="price">{item.price} د.ع</div>
                <div className="quantity-control">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                className="cart-item-remove" 
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <div id="cart-total">
        <div>الإجمالي: {total} د.ع</div>
        <span>الدفع نقداً عند الاستلام 💵</span>
      </div>
      
      <div className="cash-option">
        <p>✅ الدفع عند الاستلام</p>
      </div>
      
      <button id="checkout-btn" onClick={checkout}>
        📲 اطلب الآن عبر واتساب
      </button>
    </aside>
  );
};

export default CartSidebar;