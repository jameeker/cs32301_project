import React from 'react';
import { HomeButton, NavButtonBar } from '../../components';
import './personal_board.css';

const PagePersonalBoard = () => {
  return (
    <div className="personal-board">
      <h1>Personal Bulletin Board</h1>
      <p>Your saved notes will appear here.</p>
      
      {/* Add both navigation components */}
      <HomeButton />
      <NavButtonBar />
    </div>
  );
};

export default PagePersonalBoard;