import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import './ClockIcon.css';

const ClockIcon = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  useEffect(() => {
    // Initialize or retrieve countdown target time
    const getTimeRemaining = () => {
      const storedTargetTime = localStorage.getItem('resetTargetTime');
      
      if (storedTargetTime) {
        // Calculate remaining time from stored target
        const targetTime = parseInt(storedTargetTime, 10);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const remaining = targetTime - currentTime;
        
        // If time expired or invalid, set a new target
        if (isNaN(remaining) || remaining <= 0) {
          const newTargetTime = currentTime + (24 * 60 * 60); // 24 hours from now
          localStorage.setItem('resetTargetTime', newTargetTime.toString());
          return 24 * 60 * 60;
        }
        
        return remaining;
      } else {
        // First time app is run, set the target time
        const currentTime = Math.floor(Date.now() / 1000);
        const targetTime = currentTime + (24 * 60 * 60); // 24 hours from now
        localStorage.setItem('resetTargetTime', targetTime.toString());
        return 24 * 60 * 60;
      }
    };
    
    // Set the initial time remaining
    setTimeRemaining(getTimeRemaining());
    
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          // When timer expires, set a new target time
          const currentTime = Math.floor(Date.now() / 1000);
          const newTargetTime = currentTime + (24 * 60 * 60);
          localStorage.setItem('resetTargetTime', newTargetTime.toString());
          clearInterval(timer);
          return 24 * 60 * 60;
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
