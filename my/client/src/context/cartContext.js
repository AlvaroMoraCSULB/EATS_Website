import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    add: false,
    remove: null, // stores item ID being removed
    clear: false
  });
  const { token } = useAuth();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    setActionLoading(prev => ({ ...prev, add: true }));
    try {
      if (!item?._id || !item?.price || !item?.name) {
        throw new Error('Invalid item structure');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart/add`,
        { itemId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status >= 400) {
        throw new Error(response.data.message);
      }

      await fetchCart();
    } catch (error) {
      console.error('Add to cart failed:', error);
      throw error;
    } finally {
      setActionLoading(prev => ({ ...prev, add: false }));
    }
  };

  const removeFromCart = async (itemId) => {
    setActionLoading(prev => ({ ...prev, remove: itemId }));
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/cart/remove/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (error) {
      console.error('Remove from cart failed:', error);
      throw error;
    } finally {
      setActionLoading(prev => ({ ...prev, remove: null }));
    }
  };

  const clearCart = async () => {
    setActionLoading(prev => ({ ...prev, clear: true }));
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/cart/clear`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart([]);
    } catch (error) {
      console.error('Clear cart failed:', error);
      throw error;
    } finally {
      setActionLoading(prev => ({ ...prev, clear: false }));
    }
  };
  
  const updateQuantity = async (itemId, newQuantity) => {
    setActionLoading(prev => ({ ...prev, update: itemId }));
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/cart/update/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (error) {
      console.error('Update quantity failed:', error);
      throw error;
    } finally {
      setActionLoading(prev => ({ ...prev, update: null }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        actionLoading,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
		updateQuantity,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        cartTotal: cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);