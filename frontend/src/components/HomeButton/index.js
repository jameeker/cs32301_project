import React from 'react';
import { useHistory } from 'react-router-dom';

const HomeButton = () => {
  const history = useHistory();
  
  return (
    <button 
      className="home-button" 
      onClick={() => history.push('/')}
      title="Return to Bulletin Board"
    >
    </button>
  );
};

export default HomeButton;