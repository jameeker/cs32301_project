import React from 'react';
<<<<<<< HEAD
import { HomeButton, NavButtonBar, ClockIcon } from '../../components';
import "./view_note.css";

const NoteOverlay = ({ onClose, note }) => {
  return (
    <div className="overlay">
      <div className={`modal sticky-note ${note?.color || 'yellow'}`}>
        <div className="pin" />
        <h2 className="note-title">{note?.title || "Note Title"}</h2>
        <p className="note-text">{note?.text || "Note content goes here."}</p>
        <div className="close-x" onClick={onClose}>×</div>
=======
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
>>>>>>> 0e97a0d83542cfdfa413f5d2b10213583d0fdf24
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default NoteOverlay;
=======
export default PageViewNote;
>>>>>>> 0e97a0d83542cfdfa413f5d2b10213583d0fdf24
