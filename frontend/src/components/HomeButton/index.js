import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      className="home-button" 
      onClick={() => navigate('/')}
      title="Return to Bulletin Board"
    >
      {/* Simple home icon using unicode */}
      🏠
    </button>
  );
};

export default HomeButton;