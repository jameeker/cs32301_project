import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HomeButton.css';

// const HomeButton = () => {
//   const navigate = useNavigate();

//   return (
//     <button 
//       className="home-button" 
//       onClick={() => navigate('/')}
//       title="Return to Bulletin Board"
//     >
//       {/* Simple home icon using unicode */}
//       🏠
//     </button>
//   );
// };

// For example, in HomeButton:
import { useHistory } from 'react-router-dom';

const HomeButton = () => {
  const history = useHistory();
  
  return (
    <button 
      className="home-button" 
      onClick={() => history.push('/')}
      title="Return to Bulletin Board"
    >
      🏠
    </button>
  );
};

export default HomeButton;