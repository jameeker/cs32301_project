import React, { useState, useEffect } from 'react';
import { NavButtonBar, ClockIcon } from '../../components';
import ClockOverlay from '../page_clock_stats/clock_stats';
import ViewNoteOverlay from '../page_view_note/view_note';
import './bulletin_board.css';

// Helper function to determine the appropriate CSS color class from color hex value
const getColorClass = (color) => {
  if (!color) return 'yellow'; // Default
  
  color = color.toLowerCase();
  if (color.includes('ff') && color.includes('cc') && !color.includes('ff, cc')) return 'yellow';
  if (color.includes('cc') && color.includes('ff') && color.includes('cc')) return 'green';
  if (color.includes('cc') && color.includes('ff') && color.includes('ff')) return 'blue';
  if (color.includes('ff') && color.includes('cc') && color.includes('ff')) return 'pink';
  if (color.includes('f5') || color === '#ffffff' || color === '#fff') return 'white';
  
  // Default to using the color directly
  return '';
};

const PageBulletinBoard = () => {

  const [showClockOverlay, setShowClockOverlay] = useState(false);
  const [showNoteOverlay, setShowNoteOverlay] = useState(false);

  const handleNoteClick = () => {
    setShowNoteOverlay(true);
  };

  const [notes, setNotes] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch notes from the API
    const fetchNotes = async () => {
      try {
        setLoading(true);
        console.log("Fetching notes from API...");
        const response = await fetch('http://127.0.0.1:5000/api/bulletin-board/notes');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API response data:", data);
        
        // Split notes into regular notes and prompts
        const fetchedPrompts = data.filter(note => note.is_prompt);
        const fetchedNotes = data.filter(note => !note.is_prompt);
        
        console.log("Filtered prompts:", fetchedPrompts);
        console.log("Filtered notes:", fetchedNotes);
        
        setPrompts(fetchedPrompts);
        setNotes(fetchedNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Display loading state
  if (loading) {
    return (
      <div className="bulletin-board">
        <h1>Community Bulletin Board</h1>
        <div className="board loading">Loading notes...</div>
        <NavButtonBar />
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bulletin-board">
        <h1>Community Bulletin Board</h1>
        <div className="board error">{error}</div>
        <NavButtonBar />
      </div>
    );
  }

  // Debug info - log exactly what we're about to render
  console.log("About to render bulletin board with:", {
    notesCount: notes.length,
    promptsCount: prompts.length,
    notes,
    prompts
  });

  return (
    <div className="bulletin-board">
      <h1>Community Bulletin Board</h1>

      <button onClick={() => setShowClockOverlay(true)} className="open-overlay-button">
        <ClockIcon />
      </button>

      <div className="board" style={{ position: 'relative', minHeight: '600px', border: '1px solid #ccc' }}>
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
              width: '180px',
              height: '220px',
              backgroundColor: prompt.color || '#FFFFF3',
              border: '3px solid #ffcc00',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transform: `rotate(${prompt.rotation || 0}deg)`,
              zIndex: prompt.z_index || 5
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transform: `rotate(${note.rotation || 0}deg)`,
              zIndex: note.z_index || 0
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
