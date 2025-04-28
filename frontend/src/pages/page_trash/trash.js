import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavButtonBar } from '../../components';
import './trash.css';

// Import images 
import trashPageImage from './trash-page.png';
import trashPage2Image from './trash-page2.png';
import stickyNoteImage from '../../assets/backgrounds/sticky-note.png';
import homeIconImage from '../../assets/backgrounds/home-icon.png';

const PageTrash = () => {
  const history = useHistory();
  const [view, setView] = useState('main'); // 'main', 'note', or 'grid'
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [noteRevealed, setNoteRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const notes = [
    "Hi my name is.",
    "Reminder: feed the raccoon.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. ―Albert Einstein"
  ];

  // Handler for Yes/No buttons
  const lookInTrash = (answer) => {
    if (answer) {
      setMessage("You found something interesting in the trash!");
      setShowMessage(true);

      // Navigate to note view after 2 seconds
      setTimeout(() => {
        setView('note');
        setShowMessage(false);
      }, 2000);
    } else {
      setMessage("You chose not to look in the trash.");
      setShowMessage(true);
    }
  };

  // Handler for clicking on the note page
  const showStickyNote = (e) => {
    // Don't do anything if clicked on specified elements
    if (
      e.target.closest('.about-help') ||
      e.target.classList.contains('home-icon') ||
      e.target.id === 'stickyNote' ||
      e.target.closest('.arrow-controls')
    ) return;

    if (!noteRevealed) {
      setNoteRevealed(true);
    }
  };

  // Navigation handlers
  const goHome = (e) => {
    if (e) e.stopPropagation();
    history.push('/');
  };

  const goToHowTo = (e) => {
    if (e) e.stopPropagation();
    history.push('/how-to');
  };

  const goToGrid = (e) => {
    if (e) e.stopPropagation();
    setView('grid');
  };

  // Note navigation handlers
  const prevNote = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + notes.length) % notes.length);
  };

  const nextNote = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % notes.length);
  };

  // Render the main view (trash.html)
  const renderMainView = () => (
    <div className="trash-main" style={{ backgroundImage: `url(${trashPageImage})` }}>
      <div className="button-container-right">
        <button className="btn" onClick={() => lookInTrash(true)}>Yes</button>
      </div>
      <div className="button-container-left">
        <button className="btn" onClick={() => lookInTrash(false)}>No</button>
      </div>

      {showMessage && (
        <div className="message">{message}</div>
      )}

      <img src={homeIconImage} alt="Home" className="home-icon" onClick={goHome} />

      <div className="about-help">
        <button onClick={goToHowTo}>Help</button>
        <button onClick={goToGrid}>Recovered Notes</button>
      </div>
    </div>
  );

  // Render the note view (trash2.html)
  const renderNoteView = () => (
    <div className="trash-note" 
         style={{ backgroundImage: `url(${trashPage2Image})` }}
         onClick={showStickyNote}>
      
      {noteRevealed && (
        <>
          <img 
            src={stickyNoteImage} 
            alt="Sticky Note" 
            className="sticky-note" 
            id="stickyNote" 
          />

          <div className="note-text" id="noteText">
            {notes[currentIndex]}
          </div>

          <div className="arrow-controls" id="arrowControls">
            <span onClick={prevNote}>&lt;</span>
            <span onClick={nextNote}>&gt;</span>
          </div>
        </>
      )}

      <img src={homeIconImage} alt="Home" className="home-icon" onClick={goHome} />

      <div className="about-help">
        <button onClick={goToHowTo}>Help</button>
        <button onClick={goToGrid}>Recovered Notes</button>
      </div>
    </div>
  );

  // Render the grid view (grid.html)
  const renderGridView = () => (
    <div className="trash-grid" style={{ backgroundImage: `url(${trashPage2Image})` }}>
      <div className="grid-container">
        <div className="note">Hi my name is.</div>
        <div className="note">Reminder: feed the raccoon.</div>
        <div className="note">"hello"</div>
      </div>

      <img src={homeIconImage} alt="Home" className="home-icon" onClick={goHome} />

      <div className="about-help">
        <button onClick={goToHowTo}>Help</button>
      </div>
    </div>
  );

  // Render the appropriate view based on state
  return (
    <div className="page-trash">
      <NavButtonBar />
      {view === 'main' && renderMainView()}
      {view === 'note' && renderNoteView()}
      {view === 'grid' && renderGridView()}
    </div>
  );
};

export default PageTrash;
