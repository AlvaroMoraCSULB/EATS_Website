import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/authContext';

const Donations = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    amount: '',
    message: ''
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setFormData({ ...formData, amount: '', message: '' });
  };

  return (
    <div className="app-container">

      <div className="donation-page">
        <h2>Support EATS</h2>
        
        {showMessage ? (
          <div className="donation-message">
            <p>We are currently not taking online donations right now.</p>
            <p>We apologize for the inconvenience.</p>
            <button 
              onClick={() => setShowMessage(false)}
              className="return-button"
            >
              Return to Form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                name="amount"
                min="1"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="donate-button">Donate Now</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Donations;