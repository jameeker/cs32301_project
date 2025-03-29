import React from 'react';

const BulletinBoard = () => {
  // Basic styling for the bulletin board
  const boardStyle = {
    backgroundColor: '#c9b18b',  // Cork board color
    width: '90%',
    height: '80vh',
    margin: '40px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    position: 'relative',
    border: '15px solid #8B4513'  // Brown frame
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  // Just a placeholder message on the board
  const placeholderStyle = {
    backgroundColor: '#ffd3b6',  // Light orange sticky note
    padding: '15px',
    width: '200px',
    height: '150px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
    transform: 'rotate(-3deg)',
    position: 'absolute',
    top: '100px',
    left: '150px',
    fontFamily: 'Comic Sans MS, cursive, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  };

  return (
    <div>
      <h1 style={headerStyle}>Community Bulletin Board</h1>
      <div style={boardStyle}>
        {/* This is just a placeholder sticky note */}
        <div style={placeholderStyle}>
          This is where notes will appear. Coming soon!
        </div>
      </div>
    </div>
  );
};

export default BulletinBoard;