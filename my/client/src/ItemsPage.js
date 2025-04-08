import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import CartDisplay from './components/CartDisplay';  // Add this import

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/items')
      .then(res => {
        setItems(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError('Failed to load items. Please refresh the page.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Embedded Applications Technology Society</h1>
      
      {/* Hamburger Menu */}
      <div className="hamburger-menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <span className="menu-text">Items</span>
        <nav className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/files">Files</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/officers">Officers</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/items">Items</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/maps">Maps</Link></li>
            <li><Link to="/donations">Donations</Link></li>
          </ul>
        </nav>
      </div>
	  
	  {/* Cart Display Component */}
      <CartDisplay />

      {/* Items Container - Adjusted to account for header and menu */}
      <div style={{
        maxWidth: '1200px',
        margin: '120px auto 20px', // Increased top margin for header + menu
        padding: '20px'
      }}>
        {error && (
          <div style={{
            padding: '15px',
            background: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '40px'
          }}>
            <p>Loading items...</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '25px',
            padding: '10px'
          }}>
            {items.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;