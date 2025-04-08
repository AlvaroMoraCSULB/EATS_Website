import React, { useState } from 'react';
import { useCart } from '../context/cartContext';

const spinnerStyle = {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  border: '3px solid rgba(0,0,0,.3)',
  borderRadius: '50%',
  borderTopColor: '#000',
  animation: 'spin 1s ease-in-out infinite',
  marginRight: '8px',
  verticalAlign: 'middle'
};

const CartDisplay = () => {
  const {
    cart,
    cartTotal,
    cartCount,
    loading,
    actionLoading,
    removeFromCart,
    clearCart,
    updateQuantity
  } = useCart();
  const [showOrderMessage, setShowOrderMessage] = useState(false);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleCheckout = () => {
    setShowOrderMessage(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      minWidth: '320px'
    }}>
      <h3 style={{ 
        marginTop: 0,
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>Your Cart ({cartCount})</span>
        {loading && (
          <span style={{ fontSize: '0.8em', display: 'flex', alignItems: 'center' }}>
            <span style={spinnerStyle}></span>
            Loading...
          </span>
        )}
      </h3>

      {showOrderMessage ? (
        <div style={{
          padding: '15px',
          backgroundColor: '#fff8e1',
          borderRadius: '6px',
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            We are currently not taking online orders right now.
          </p>
          <p style={{ margin: '0 0 15px 0' }}>
            Sorry for the inconvenience.
          </p>
          <button
            onClick={() => setShowOrderMessage(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to Cart
          </button>
        </div>
      ) : loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '30px 20px'
        }}>
          <span style={{ ...spinnerStyle, width: '30px', height: '30px' }}></span>
        </div>
      ) : cartCount === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#666'
        }}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            maxHeight: '50vh',
            overflowY: 'auto',
            marginBottom: '20px'
          }}>
            {cart.map(cartItem => {
              const isRemoving = actionLoading.remove === cartItem.item._id;
              const isUpdating = actionLoading.update === cartItem.item._id;
              const price = parseFloat(cartItem.item?.price) || 0;
              const quantity = parseInt(cartItem.quantity) || 0;
              const itemTotal = price * quantity;

              return (
                <li 
                  key={`${cartItem.item?._id}-${cartItem.item?.name}`} 
                  style={{ 
                    margin: '10px 0',
                    padding: '10px 0',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    opacity: isRemoving || isUpdating ? 0.6 : 1
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>
                      {cartItem.item?.name || 'Unknown Item'}
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#666' }}>
                      ${price.toFixed(2)} each
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    margin: '0 10px'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(cartItem.item._id, quantity - 1)}
                      disabled={isRemoving || isUpdating || quantity <= 1}
                      style={{
                        background: '#f0f0f0',
                        border: 'none',
                        borderRadius: '4px 0 0 4px',
                        padding: '4px 8px',
                        cursor: quantity <= 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      -
                    </button>
                    <div style={{
                      padding: '4px 10px',
                      background: '#f8f8f8',
                      textAlign: 'center',
                      minWidth: '30px'
                    }}>
                      {isUpdating ? (
                        <span style={{ 
                          ...spinnerStyle, 
                          width: '12px', 
                          height: '12px',
                          display: 'inline-block'
                        }} />
                      ) : (
                        quantity
                      )}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(cartItem.item._id, quantity + 1)}
                      disabled={isRemoving || isUpdating}
                      style={{
                        background: '#f0f0f0',
                        border: 'none',
                        borderRadius: '0 4px 4px 0',
                        padding: '4px 8px',
                        cursor: isRemoving || isUpdating ? 'not-allowed' : 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ 
                    textAlign: 'right',
                    minWidth: '70px'
                  }}>
                    <div>${itemTotal.toFixed(2)}</div>
                    <button 
                      onClick={() => !isRemoving && removeFromCart(cartItem.item._id)}
                      disabled={isRemoving}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isRemoving ? '#999' : '#ff4444',
                        cursor: isRemoving ? 'not-allowed' : 'pointer',
                        fontSize: '0.8em',
                        padding: '2px 5px'
                      }}
                    >
                      {isRemoving ? (
                        <span style={{ 
                          ...spinnerStyle, 
                          width: '12px', 
                          height: '12px',
                          display: 'inline-block'
                        }}></span>
                      ) : 'Remove'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          
          <div style={{ 
            borderTop: '1px solid #eee', 
            paddingTop: '15px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={clearCart}
                disabled={actionLoading.clear}
                style={{
                  flex: 1,
                  background: actionLoading.clear ? '#e0e0e0' : '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: actionLoading.clear ? 'not-allowed' : 'pointer'
                }}
              >
                {actionLoading.clear ? 'Clearing...' : 'Clear Cart'}
              </button>
              
              <button
                onClick={handleCheckout}
                style={{
                  flex: 1,
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDisplay;