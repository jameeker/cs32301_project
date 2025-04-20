import React from 'react';
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
      </div>
    </div>
  );
};

export default NoteOverlay;
