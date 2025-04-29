import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavButtonBar } from '../../components';
import { getClientId } from '../../utils/utils';
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
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch trashed notes from the API
  const fetchTrashedNotes = async () => {
    try {
      setLoading(true);
      console.log("Fetching trashed notes from API...");
      
      // Use system_user for fetching notes to maintain consistency
      const response = await fetch(`http://127.0.0.1:5000/api/personal-board/trash?client_id=system_user`);
      
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      console.log("API trashed notes response:", data);
      
      // Update state with the fetched data
      setTrashedNotes(data);
    } catch (err) {
      // Handle any errors that occurred during fetch
      console.error("Error fetching trashed notes:", err);
      setError("Failed to load trashed notes. Please try again later.");
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };
  
  // Fetch trashed notes when component mounts or when view changes to 'grid'
  useEffect(() => {
    if (view === 'grid') {
      fetchTrashedNotes();
    }
  }, [view]);

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
      <h2>Recovered Notes</h2>
      
      {/* Display loading or error states */}
      {loading && <div className="loading-message">Loading trashed notes...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="grid-container">
        {/* Static notes - keep these always visible */}
        <div className="note">Hi my name is.</div>
        <div className="note">Reminder: feed the raccoon.</div>
        <div className="note">"hello"</div>
        
        {/* Dynamic notes from the API */}
        {trashedNotes.map(note => (
          <div key={note.id} className="note" style={{ backgroundColor: note.color || '#ffffcc' }}>
            {note.content}
          </div>
        ))}
      </div>

      <img src={homeIconImage} alt="Home" className="home-icon" onClick={goHome} />

      <div className="about-help">
        <button onClick={goToHowTo}>Help</button>
        <button onClick={() => history.push('/personal')}>Return to Board</button>
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
