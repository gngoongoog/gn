import React from 'react';

const ProductCard = ({ product, onAddToCart, onClick }) => {
  return (
    <div 
      className="product-card"
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      <div style={{
        position: 'relative',
        height: '180px',
        overflow: 'hidden',
        borderRadius: '10px',
        marginBottom: '15px'
      }}>
        <img 
          src={product.image || "https://via.placeholder.com/300/4a6fa5/FFFFFF?text=GN+Store"} 
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s'
          }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
        />
        {product.new && (
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#e63946',
            color: 'white',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            جديد!
          </span>
        )}
      </div>
      
      <h3 style={{
        fontSize: '1.3rem',
        color: '#2b3748',
        marginBottom: '8px',
        height: '50px',
        overflow: 'hidden'
      }}>
        {product.name}
      </h3>
      
      <p className="price" style={{
        fontSize: '1.2rem',
        color: '#e63946',
        fontWeight: 'bold',
        marginBottom: '15px'
      }}>
        {product.price} د.ع
      </p>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        style={{
          background: '#4a6fa5',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          width: '100%',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'background 0.3s'
        }}
        onMouseOver={e => e.target.style.background = '#3a5a8c'}
        onMouseOut={e => e.target.style.background = '#4a6fa5'}
      >
        عرض التفاصيل →
      </button>
    </div>
  );
};

export default ProductCard;
