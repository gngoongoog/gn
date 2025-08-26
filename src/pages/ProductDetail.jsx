import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: '#666'
      }}>
        المنتج غير موجود! <br />
        <button 
          onClick={() => navigate(-1)}
          style={{
            background: '#4a6fa5',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '8px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          العودة للمنتجات
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Cairo, sans-serif'
    }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: '1px solid #4a6fa5',
          color: '#4a6fa5',
          padding: '8px 15px',
          borderRadius: '8px',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← العودة
      </button>

      <div style={{
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '1',
          minWidth: '300px'
        }}>
          <img 
            src={product.image || "https://via.placeholder.com/400"} 
            alt={product.name}
            style={{
              width: '100%',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }} 
          />
        </div>

        <div style={{
          flex: '1',
          minWidth: '300px'
        }}>
          <h1 style={{
            fontSize: '2rem',
            color: '#2b3748',
            marginBottom: '10px'
          }}>
            {product.name} ✨
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            color: '#e63946',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            {product.price} د.ع
          </p>

          <div style={{
            backgroundColor: '#f8f9ff',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '25px'
          }}>
            <h2 style={{ 
              color: '#4a6fa5', 
              marginBottom: '15px',
              fontSize: '1.3rem'
            }}>المواصفات:</h2>
            <ul style={{
              listStyle: 'none',
              paddingLeft: '0'
            }}>
              {product.description && <li>🔹 {product.description}</li>}
              {product.color && <li>🔹 اللون: {product.color}</li>}
              {product.material && <li>🔹 المادة: {product.material}</li>}
              {product.warranty && <li>🔹 الضمان: {product.warranty}</li>}
            </ul>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px'
          }}>
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: '40px',
                height: '40px',
                background: '#f0f4f8',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              -
            </button>
            <span style={{
              fontSize: '1.3rem',
              minWidth: '30px',
              textAlign: 'center'
            }}>
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              style={{
                width: '40px',
                height: '40px',
                background: '#f0f4f8',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>

          <button 
            style={{
              background: '#4a6fa5',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.2rem',
              width: '100%',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          >
            أضف لسلة الشراء 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;