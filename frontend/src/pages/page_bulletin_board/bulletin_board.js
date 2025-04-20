import React, { useState } from 'react';
import { NavButtonBar, ClockIcon } from '../../components';
import './bulletin_board.css';
import ClockOverlay from '../page_clock_stats/clock_stats';
<<<<<<< HEAD
import ViewNoteOverlay from '../page_view_note/view_note';
=======
import NoteOverlay from '../page_view_note/view_note'
>>>>>>> 0e97a0d83542cfdfa413f5d2b10213583d0fdf24

const PageBulletinBoard = () => {
  const [showClockOverlay, setShowClockOverlay] = useState(false);
  const [showNoteOverlay, setShowNoteOverlay] = useState(false);

  const handleNoteClick = () => {
    setShowNoteOverlay(true);
  };

  const notes = [
    { id: 1, content: 'note 1', color: '#ffd3b6', position_x: 100, position_y: 100 },
    { id: 2, content: 'note 2', color: '#ffffcc', position_x: 300, position_y: 150 },
    { id: 3, content: 'note 3', color: '#ccffcc', position_x: 500, position_y: 200 },
    { id: 4, content: 'note 4', color: '#ccffff', position_x: 200, position_y: 250 },
    { id: 5, content: 'note 5', color: '#ffffcc', position_x: 1300, position_y: 300 },
    { id: 6, content: 'note 6', color: '#ffccff', position_x: 1000, position_y: 500 },
    { id: 7, content: 'note 7', color: '#ccffcc', position_x: 1400, position_y: 90 },
    { id: 8, content: 'note 9', color: '#ffccff', position_x: 950, position_y: 280 },
    { id: 9, content: 'note 10', color: '#ccffff', position_x: 700, position_y: 10 },
    { id: 10, content: 'note 10', color: '#ffffcc', position_x: 1000, position_y: 150 },
    { id: 11, content: 'note 12', color: '#ffccff', position_x: 780, position_y: 350 },
    { id: 12, content: 'note 8', color: '#ccffcc', position_x: 880, position_y: 40 }
  ];

  const prompts = [
    {
      id: 1,
      content: 'Prompt note 1',
      position_x: 150,
      position_y: 180,
      width: 180,
      height: 220,
      background: '#ffffcc',
      border: '3px solid #ffcc00'
    },
    {
      id: 2,
      content: 'Prompt note 2',
      position_x: 650,
      position_y: 200,
      width: 220,
      height: 280,
      background: '#ffccff',
      border: '3px solid #ff66ff'
    }
  ];

  return (
    <div className="bulletin-board">
      <h1>Community Bulletin Board</h1>

      <button onClick={() => setShowClockOverlay(true)} className="open-overlay-button">
        <ClockIcon />
      </button>

      <div className="board">
        {showClockOverlay && <ClockOverlay onClose={() => setShowClockOverlay(false)} />}

        <NavButtonBar />

        {prompts.map(prompt => (
          <div 
            key={`prompt-${prompt.id}`}
            className="prompt-note"
            style={{
              position: 'absolute',
              left: `${prompt.position_x}px`,
              top: `${prompt.position_y}px`,
              width: `${prompt.width}px`,
              height: `${prompt.height}px`,
              backgroundColor: prompt.background,
              border: prompt.border,
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 5
            }}
          >
            {prompt.content}
          </div>
        ))}

        {notes.map(note => (
          <div
            key={note.id}
            className="note"
            style={{
              position: 'absolute',
              backgroundColor: note.color,
              left: `${note.position_x}px`,
              top: `${note.position_y}px`,
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onClick={handleNoteClick}
          >
            {note.content}
          </div>
        ))}

        
      </div>

      {showNoteOverlay && (
        <ViewNoteOverlay onClose={() => setShowNoteOverlay(false)} />
      )}
    </div>
  );
};

export default PageBulletinBoard;
