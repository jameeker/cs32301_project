import React from 'react';
import './view_note.css';

const ViewNoteOverlay = ({ note, onClose }) => {
  if (!note) return null; // Don't render anything if no note is provided

  return (
    <div className="overlay">
      <div className="note-modal" style={{ backgroundColor: note.color }}>
        <div className="close-x" onClick={onClose}>×</div>
        <h2 className="note-header">{note.header}</h2>
        <p className="note-body">{note.body}</p>
      </div>
    </div>
  );
};

export default ViewNoteOverlay;