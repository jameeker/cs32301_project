import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavButtonBar.css';

const NavButtonBar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-button-bar">
      <button 
        className="nav-button about-button"
        onClick={() => navigate('/about')}
      >
        About
      </button>
      <button 
        className="nav-button howto-button"
        onClick={() => navigate('/how-to')}
      >
        How-to
      </button>
    </div>
  );
};

export default NavButtonBar;