import React from 'react';
import { HomeButton, NavButtonBar, ClockIcon } from '../../components';
import "./clock_stats.css";

const ClockOverlay = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
      <h2 className="title">Time Remaining</h2>
      <ClockIcon/> {}
        <p className="description">The Clock is ticking. 
          Impermanence is one of __WEBSITE NAME__’s core values, as after 24 hours, 
          all of the notes on the board will be reset, and new prompts will be posted.
           However, you can save any notes you’d like to your personal board to keep them for future reference.</p>
        <button onClick={onClose} className="overlay-close-button">Close</button>
      </div>
    </div>
  );
};

export default ClockOverlay;