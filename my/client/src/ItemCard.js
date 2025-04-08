import React, { useState } from 'react';
import { useCart } from './context/cartContext';
import { useAuth } from './context/authContext';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const { addToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = async () => {
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }
    
    setIsProcessing(true);
    try {
      await addToCart(item);
      alert(`${item.name} added to cart!`);
    } catch (error) {
      console.error('Add to cart error:', error);
      alert(error.message || 'Failed to add item to cart');
    } finally {
      setIsProcessing(false);
    }
  };

  const proceedToLogin = () => {
    navigate('/login', { 
      state: { 
        message: "Please login to add items to cart",
        returnTo: '/items',
        itemName: item.name
      } 
    });
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative' // For login prompt positioning
    }}>
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '300px'
          }}>
            <h3 style={{ marginTop: 0 }}>Login Required</h3>
            <p>You need to be logged in to add items to your cart.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={proceedToLogin}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Go to Login
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Image */}
      <div style={{
        flex: '1',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '15px'
      }}>
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Product Info */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '1rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {item.name}
        </h3>
        <p style={{ 
          margin: '0', 
          fontWeight: 'bold', 
          color: '#2e7d32',
          fontSize: '1.1rem'
        }}>
          ${item.price.toFixed(2)}
        </p>
        
        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isProcessing}
          style={{
            marginTop: '15px',
            padding: '10px',
            width: '100%',
            backgroundColor: isProcessing ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {isProcessing ? (
            <>
              <span style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;