import React from 'react';
import { useHistory } from 'react-router-dom';
import './NavButtonBar.css';

const NavButtonBar = () => {
  const history = useHistory();

  return (
    <div className="nav-button-bar">
      <button 
        className="nav-button about-button"
        onClick={() => history.push('/about')}
      >
        About
      </button>
      <button 
        className="nav-button how-to-button"
        onClick={() => history.push('/how-to')}
      >
        How-To
      </button>
    </div>
  );
};

export default NavButtonBar;