/**
 * Bulletin Board Page Component
 * 
 * This component renders the community bulletin board where users can view public notes and prompts.
 * 
 * API ENDPOINT DOCUMENTATION:
 * This component interacts with the following endpoint:
 * 
 * GET /api/bulletin-board/notes
 * - Description: Fetches all public notes and prompts from the bulletin board
 * - Authentication: None required
 * - Response format: Array of note objects with the following properties:
 *   {
 *     id: number,            // Unique identifier for the note
 *     content: string,       // The text content of the note
 *     color: string,         // Color of the note (hex code)
 *     is_prompt: boolean,    // Whether this note is a prompt (true) or regular note (false)
 *     position_x: number,    // X coordinate for position (in pixels)
 *     position_y: number,    // Y coordinate for position (in pixels)
 *     rotation: number,      // Rotation angle in degrees
 *     z_index: number        // Z-index for stacking order
 *   }
 * - Error handling: Returns HTTP status codes with error messages for failure cases
 * 
 * Other available endpoints (not used in this component):
 * 
 * POST /api/bulletin-board/notes
 * - Creates a new note on the bulletin board
 * - Requires content, optionally accepts color, position_x, position_y
 * 
 * PATCH /api/bulletin-board/notes/:id
 * - Updates an existing note
 * - Can modify content, color, position
 * 
 * DELETE /api/bulletin-board/notes/:id
 * - Removes a note from the bulletin board
 * 
 * POST /api/bulletin-board/notes/:id/save
 * - Saves a note from the public board to a user's personal board
 * 
 * GET /api/bulletin-board/prompts
 * - Returns only prompt notes
 * 
 * POST /api/bulletin-board/reset
 * - Admin function to reset the bulletin board
 */

import React, { useState, useEffect, useRef } from 'react';
import { NavButtonBar, ClockIcon } from '../../components';
import ClockOverlay from '../page_clock_stats/clock_stats';
import ViewNoteOverlay from '../page_view_note/view_note';
<<<<<<< HEAD
import './bulletin_board.css';

const PageBulletinBoard = () => {
  // State for managing overlay visibility
=======
import WriteNoteOverlay from '../page_write_note/write_note';

const PageBulletinBoard = () => {
>>>>>>> dev/frontend
  const [showClockOverlay, setShowClockOverlay] = useState(false);
  const [showNoteOverlay, setShowNoteOverlay] = useState(false);
  const [showWriteOverlay, setShowWriteOverlay] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

<<<<<<< HEAD
  // Handler for when a note is clicked to view details
  const handleNoteClick = () => {
    setShowNoteOverlay(true);
  };

  // State for storing notes data and UI states
  const [notes, setNotes] = useState([]); // Regular notes
  const [prompts, setPrompts] = useState([]); // Prompt notes
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message if fetch fails
  const [boardDimensions, setBoardDimensions] = useState({ width: 0, height: 0 });
  
  // Reference to the board element for measuring dimensions
  const boardRef = useRef(null);

  // Function to update board dimensions
  const updateBoardDimensions = () => {
    if (boardRef.current) {
      const { offsetWidth, offsetHeight } = boardRef.current;
      setBoardDimensions({
        width: offsetWidth,
        height: offsetHeight
      });
      console.log("Board dimensions:", offsetWidth, "x", offsetHeight);
    }
  };
=======
  const isBoardClickable = !showClockOverlay && !showNoteOverlay && !showWriteOverlay;

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowNoteOverlay(true);
  };

  const handleBoardClick = () => {
    setShowWriteOverlay(true);
  };
/*
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
  */

  // const notes = [
  //   { id: 1, content: 'note 1', color: '#ffd3b6', position_x: 100, position_y: 100 },
  //   { id: 2, content: 'note 2', color: '#ffffcc', position_x: 300, position_y: 150 },
  //   { id: 3, content: 'note 3', color: '#ccffcc', position_x: 500, position_y: 200 },
  //   { id: 4, content: 'note 4', color: '#ccffff', position_x: 200, position_y: 250 },
  //   { id: 5, content: 'note 5', color: '#ffffcc', position_x: 1300, position_y: 300 },
  //   { id: 6, content: 'note 6', color: '#ffccff', position_x: 1000, position_y: 500 },
  //   { id: 7, content: 'note 7', color: '#ccffcc', position_x: 1400, position_y: 90 },
  //   { id: 8, content: 'note 9', color: '#ffccff', position_x: 950, position_y: 280 },
  //   { id: 9, content: 'note 10', color: '#ccffff', position_x: 700, position_y: 10 },
  //   { id: 10, content: 'note 10', color: '#ffffcc', position_x: 1000, position_y: 150 },
  //   { id: 11, content: 'note 12', color: '#ffccff', position_x: 780, position_y: 350 },
  //   { id: 12, content: 'note 8', color: '#ccffcc', position_x: 880, position_y: 40 }
  // ];

  // const prompts = [
  //   {
  //     id: 1,
  //     content: 'Prompt note 1',
  //     position_x: 150,
  //     position_y: 180,
  //     width: 180,
  //     height: 220,
  //     background: '#ffffcc',
  //     border: '3px solid #ffcc00'
  //   },
  //   {
  //     id: 2,
  //     content: 'Prompt note 2',
  //     position_x: 650,
  //     position_y: 200,
  //     width: 220,
  //     height: 280,
  //     background: '#ffccff',
  //     border: '3px solid #ff66ff'
  //   }
  // ];

  const [notes, setNotes] = useState([]);
  // const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
>>>>>>> dev/frontend

  // Add resize listener to handle responsive layout
  useEffect(() => {
    updateBoardDimensions();
    
    // Add event listener for window resize
    window.addEventListener('resize', updateBoardDimensions);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateBoardDimensions);
    };
  }, []);

  // Effect hook to fetch notes data when component mounts
  useEffect(() => {
    /**
     * Fetches notes from the API endpoint
     * - Uses the proxy setting in package.json to route to backend
     * - Separates notes and prompts based on is_prompt flag
     * - Updates state with fetched data or error message
     */
    const fetchNotes = async () => {
      try {
        setLoading(true);
        console.log("Fetching notes from API...");
        
        // Use relative URL to leverage the proxy setting in package.json
        // This will route to http://127.0.0.1:5000/api/bulletin-board/notes
        const response = await fetch('/api/bulletin-board/notes');
        
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        console.log("API response data:", data);
        
        // Split notes into regular notes and prompts based on is_prompt flag
        // This allows different rendering for each type
        const fetchedPrompts = data.filter(note => note.is_prompt);
        const fetchedNotes = data.filter(note => !note.is_prompt);
        
        console.log("Filtered prompts:", fetchedPrompts);
        console.log("Filtered notes:", fetchedNotes);
        
        // Update state with the fetched data
        setPrompts(fetchedPrompts);
        setNotes(fetchedNotes);
      } catch (err) {
        // Handle any errors that occurred during fetch
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again later.");
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Execute the fetch function when component mounts
    fetchNotes();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Display loading UI while fetching data
  if (loading) {
    return (
      <div className="bulletin-board">
        <h1>Community Bulletin Board</h1>
        <div className="board loading">Loading notes...</div>
        <NavButtonBar />
      </div>
    );
  }

  // Display error UI if fetch failed
  if (error) {
    return (
      <div className="bulletin-board">
        <h1>Community Bulletin Board</h1>
        <div className="board error">{error}</div>
        <NavButtonBar />
      </div>
    );
  }
<<<<<<< HEAD
=======

>>>>>>> dev/frontend

  // Debug information about the data we're about to render
  console.log("About to render bulletin board with:", {
    notesCount: notes.length,
    promptsCount: prompts.length,
    notes,
    prompts
  });

  // Main render function for the bulletin board
  return (
    <div className="bulletin-board">
      <h1>Community Bulletin Board</h1>

      {/* Button to open the clock overlay */}
      <button onClick={() => setShowClockOverlay(true)} className="open-overlay-button">
        <ClockIcon />
      </button>

<<<<<<< HEAD
      {/* Main board container with positioning context */}
      <div 
        ref={boardRef}
        className="board" 
        style={{ position: 'relative', minHeight: '600px' }}
        onLoad={updateBoardDimensions}
      >
        {/* Conditional rendering of clock overlay */}
        {showClockOverlay && <ClockOverlay onClose={() => setShowClockOverlay(false)} />}

        {/* Navigation buttons */}
=======
      <div
      className="board"
      onClick={(e) =>{
        if (isBoardClickable) {
          handleBoardClick();
          }
      }}
        style={{
          // Set Cursor to Plus when over Board
          cursor: !showClockOverlay && !showNoteOverlay ? 'crosshair' : 'default'
      }}>
        {showClockOverlay && <ClockOverlay onClose={() => setShowClockOverlay(false)} />}
        
>>>>>>> dev/frontend
        <NavButtonBar />

        {/* Render prompts - these are styled differently than regular notes */}
        {prompts.map(prompt => {
          // Convert backend pixel values to percentages based on board size
          // The backend converts 0-1 range to pixels with 1000px width, 500px height
          // We're converting back to percentages here
          const posX = (prompt.position_x / 1000) * 100; // Convert x position to percentage
          const posY = (prompt.position_y / 500) * 100;  // Convert y position to percentage
          
          // Ensure notes stay within bounds (5% to 85% range to account for note width)
          const boundedX = Math.min(Math.max(posX, 5), 85);
          const boundedY = Math.min(Math.max(posY, 5), 85);
          
          return (
            <div 
              key={`prompt-${prompt.id}`}
              className="prompt-note"
              style={{
                position: 'absolute',
                left: `${boundedX}%`,
                top: `${boundedY}%`,
                width: '180px',
                height: '220px',
                backgroundColor: prompt.color || '#FFFFF3', // Default color if none provided
                border: '3px solid #ffcc00',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transform: `rotate(${prompt.rotation || 0}deg)`, // Optional rotation
                zIndex: prompt.z_index || 5 // Higher z-index for prompts by default
              }}
            >
              {prompt.content}
            </div>
          );
        })}

<<<<<<< HEAD
        {/* Render regular notes */}
        {notes.map(note => {
          // Convert backend pixel values to percentages based on board size
          // The backend converts 0-1 range to pixels with 1000px width, 500px height
          // We're converting back to percentages here
          const posX = (note.position_x / 1000) * 100; // Convert x position to percentage
          const posY = (note.position_y / 500) * 100;  // Convert y position to percentage
          
          // Ensure notes stay within bounds (3% to 90% range to account for note width)
          const boundedX = Math.min(Math.max(posX, 3), 90);
          const boundedY = Math.min(Math.max(posY, 3), 90);
          
          return (
            <div
              key={note.id}
              className="note"
              style={{
                position: 'absolute',
                backgroundColor: note.color, // Color comes directly from the database
                left: `${boundedX}%`,
                top: `${boundedY}%`,
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transform: `rotate(${note.rotation || 0}deg)`, // Optional rotation
                zIndex: note.z_index || 0 // Z-index for stacking order
              }}
              onClick={handleNoteClick}
            >
              {note.content}
            </div>
          );
        })}
      </div>

      {/* Conditional rendering of note detail overlay */}
      {showNoteOverlay && (
        <ViewNoteOverlay onClose={() => setShowNoteOverlay(false)} />
=======
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
      {showWriteOverlay && (
        <WriteNoteOverlay onClose={() => setShowWriteOverlay(false)} />
>>>>>>> dev/frontend
      )}

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

export default PageBulletinBoard;
