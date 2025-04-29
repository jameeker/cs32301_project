import React from 'react';
import { useLocation } from 'react-router-dom';
import './UrlDisplay.css';

const UrlDisplay = () => {
  const location = useLocation();
  const displayUrl = `our-notes.com${location.pathname}`;
  
  return (
    <div className="url-display">
      <span className="url-text">{displayUrl}</span>
    </div>
  );
};

export default UrlDisplay;
