import React from 'react';
import trashIcon from '../../assets/trash-icon.svg';
import './view_note.css';

const ViewNoteOverlay = ({ note, onClose, isPersonalBoard }) => {
  if (!note) return null; // Don't render anything if no note is provided

  return (
    <div className="overlay">
      <div className="note-modal sticky-note" style={{ backgroundColor: note.color }}>
        <div className="close-x" onClick={onClose}>×</div>
        <h2 className="note-header">{note.header}</h2>
        <p className="note-body">{note.body}</p>

        {/* Only render trash icon for personal board */}
        {isPersonalBoard && (
            <img
            src={trashIcon}
            alt="Trash"
            className="trash-icon"
            onClick={() => {
                console.log("Trash button clicked for maximized note!");
                // Future: Trigger API call to move note to trash
            }}
            />
        )}
      </div>
    </div>
  );
};

export default ViewNoteOverlay;