import React, { useState } from 'react';
import './write_note.css';

const presetColors = ['#ffffcc', '#ccffcc', '#ccffff', '#ffccff'];

const PageWriteNote = ({ onClose, position, onSave }) => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState(presetColors[0]);

  const handleSave = () => {
    // Make sure we have some content to save
    if (!header && !body) {
      alert("Please add some content to your note before saving.");
      return;
    }

    // Package note data
    const noteData = {
      content: header ? `${header}\n\n${body}` : body, // Combine header and body
      color: color,
      position_x: position ? position.x : 0.5,
      position_y: position ? position.y : 0.5
    };
    
    // Call the onSave callback with the note data
    onSave(noteData);
  };

  return (
    <div className="overlay">
      <div className="note-modal" style={{ backgroundColor: color }}>
        <div className="close-x" onClick={onClose}>×</div>
        
        <input
          type="text"
          className="note-header"
          placeholder="Title..."
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />

        <textarea
          className="note-body"
          placeholder="Write your note here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="color-picker">
          {presetColors.map((c, idx) => (
            <button
              key={idx}
              className={`color-swatch ${c === color ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        
        {/* Add save button */}
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default PageWriteNote;
