import React, { useState } from 'react';
import './write_note.css';

const presetColors = ['#ffffcc', '#ccffcc', '#ccffff', '#ffccff'];

const PageWriteNote = ({ onClose }) => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState(presetColors[0]);

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
      </div>
    </div>
  );
};

export default PageWriteNote;