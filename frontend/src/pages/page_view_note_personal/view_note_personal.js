import React from 'react';
import './view_note_personal.css';

const ViewNotePersonalOverlay = ({ note, onClose, onTrash }) => {
  if (!note) return null; // Don't render anything if no note is provided

  // Parse the content in case it has a header and body separated by newlines
  let displayHeader = '';
  let displayBody = '';

  if (note.content) {
    // Check if content contains multiple lines with a double newline separator
    const contentParts = note.content.split('\n\n');
    if (contentParts.length > 1) {
      // If there are multiple parts, the first is the header, the rest is the body
      displayHeader = contentParts[0];
      displayBody = contentParts.slice(1).join('\n\n');
    } else {
      // If no clear separation, just use the whole content as the body
      displayBody = note.content;
    }
  }

  // Handle trash button click
  const handleTrash = () => {
    if (onTrash) {
      onTrash(note);
    }
  };

  return (
    <div className="overlay">
      <div className="note-modal" style={{ backgroundColor: note.color }}>
        <div className="close-x" onClick={onClose}>×</div>
        {displayHeader && <h2 className="note-header">{displayHeader}</h2>}
        <p className="note-body">{displayBody}</p>
        
        {/* Trash button - same positioning as archive button in view_note.js */}
        <button className="trash-button" onClick={handleTrash}>
          Trash
        </button>
      </div>
    </div>
  );
};

export default ViewNotePersonalOverlay;
