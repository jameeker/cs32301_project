import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavButtonBar } from '../../components';
import ViewNoteOverlay from '../page_view_note/view_note';
import './personal_board.css';

// Import Background Images
import bgWhite from '../../assets/backgrounds/background_white.jpg';
import bgGrass from '../../assets/backgrounds/background_grass.jpg';
import bgFern from '../../assets/backgrounds/background_fern.jpg';

import bgCloudy from '../../assets/backgrounds/cloudy-day.webp';
import bgBloom from '../../assets/backgrounds/full-bloom.webp';
import bgPaper from '../../assets/backgrounds/seamless_paper_texture.webp';
import bgGeom from '../../assets/backgrounds/geometry.webp';


const backgrounds = [
  bgWhite,
  bgCloudy,
  bgBloom,
  bgPaper,
  bgGeom
];

const PagePersonalBoard = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [showNoteOverlay, setShowNoteOverlay] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const history = useHistory(); 

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowNoteOverlay(true);
  };

  const changeBackground = (direction) => {
    setBgIndex((prevIndex) => {
      console.log("old Background Index:", prevIndex); 
      if (direction === 'next') {
        return (prevIndex + 1) % backgrounds.length;
      } else {
        return (prevIndex - 1 + backgrounds.length) % backgrounds.length;
      }
    });
  };

  const notes = [
    { id: 1, header: 'note 1', body: 'first body', color: '#ffd3b6', position_x: 100, position_y: 100 },
    { id: 2, header: 'note 2', body: 'second body', color: '#ffffcc', position_x: 300, position_y: 150 },
    { id: 3, header: 'note 3', body: 'totally testing body', color: '#ccffcc', position_x: 500, position_y: 200 },
    { id: 4, header: 'note 4', body: 'testing longer and longer messages body', color: '#ccffff', position_x: 200, position_y: 250 },
    { id: 5, header: 'note 5', body: '.', color: '#ffffcc', position_x: 1300, position_y: 300 },
    { id: 6, header: 'note 6', body: 'sixth body', color: '#ffccff', position_x: 1000, position_y: 500 },
    { id: 7, header: 'note 7', body: 'seventh body', color: '#ccffcc', position_x: 1400, position_y: 90 },
    { id: 8, header: 'note 8', body: 'trying to test really really long bodies to see if they look OK body', color: '#ffccff', position_x: 950, position_y: 280 },
    { id: 9, header: 'note 9', body: 'ninth body', color: '#ccffff', position_x: 700, position_y: 10 },
    { id: 10, header: 'note 10', body: 'Fully Puncuated And, Capitalized Body!', color: '#ffffcc', position_x: 1000, position_y: 150 },
    { id: 11, header: 'note 11', body: 'eleventh body', color: '#ffccff', position_x: 780, position_y: 350 },
    { id: 12, header: 'note 12', body: 'twelfth body', color: '#ccffcc', position_x: 880, position_y: 40 }
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
    <div className="personal-board" style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}>
      <h1>Personal Bulletin Board</h1>

      <div className="board">
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent board click
              handleNoteClick(note);
              }}
            >
            <strong>{note.header}</strong>
            <p>{note.body}</p>
          </div>
        ))}
      </div>

      <button className="arrow" onClick={() => changeBackground('prev')}>◀</button>
      <button className="arrow" onClick={() => changeBackground('next')}>▶</button>
      <button className="trash-can" onClick={() => history.push('/trash')}>🗑️</button>

      {showNoteOverlay && selectedNote && (
        <ViewNoteOverlay
          note={selectedNote}
          onClose={() => {
            setShowNoteOverlay(false);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
};

export default PagePersonalBoard;
