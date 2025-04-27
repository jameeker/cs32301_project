import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import './ClockIcon.css';

const ClockIcon = ({ initialTime = 24 * 60 * 60 }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime); // Default 24 hours in seconds
  
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
    <div className="clock-container">
      <Clock className="clock-icon" />
      {/* We don't need to display the time here since it will be shown in the overlay */}
    </div>
  );
};

export default ClockIcon;
