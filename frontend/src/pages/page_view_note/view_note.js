import React from 'react';
import './view_note.css';

const PageViewNote = ({ onClose }) => {
  //if (!note) return null;
  console.log("Rendering overlay with note:", note);
  
  return (
    
    <div className="overlay">
      <div className="note-modal" style={{ backgroundColor: 'yellow' }}>
        <h2 className="note-title">Note</h2>
        <p className="note-content">{'note.content'}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default PageViewNote;