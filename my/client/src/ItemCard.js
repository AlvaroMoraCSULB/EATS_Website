import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Flexible Image Container */}
      <div style={{
        flex: '1', // Takes available space
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '15px' // Prevents edge touching
      }}>
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain' // Ensures no cropping
          }}
        />
      </div>

      {/* Text Content */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{item.name}</h3>
        <p style={{ margin: '0', fontWeight: 'bold', color: '#2e7d32' }}>
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;