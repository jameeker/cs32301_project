import React, { useState, useEffect } from 'react';
import { HomeButton, NavButtonBar, ClockIcon } from '../../components';
import "./clock_stats.css";

const ClockOverlay = ({ onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60); // 24 hours in seconds
  
  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  // Format the time as HH:MM:SS
  const formatTime = () => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="title">Time Remaining</h2>
        <h3 className="timer">{formatTime()}</h3>
        <ClockIcon initialTime={timeRemaining} />
        <p className="description">The Clock is ticking. 
          Impermanence is one of core values of our-notes.com, as after 24 hours, 
          all of the notes on the board will be reset, and new prompts will be posted.
          However, you can save any notes you'd like to your personal board to keep them for future reference.</p>
        <button onClick={onClose} className="overlay-close-button">Close</button>
      </div>
    </div>
  );
};

export default ClockOverlay;
