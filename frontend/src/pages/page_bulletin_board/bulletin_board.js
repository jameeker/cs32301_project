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
import './bulletin_board.css';
import React, { useState, useEffect, useRef } from 'react';
import { NavButtonBar, ClockIcon } from '../../components';
import ClockOverlay from '../page_clock_stats/clock_stats';
import ViewNoteOverlay from '../page_view_note/view_note';
import WriteNoteOverlay from '../page_write_note/write_note';

const PageBulletinBoard = () => {
  // Default hard-coded prompts that will always appear on the board
  const defaultPrompts = [
    {
      id: 'default-1',
      content: "TODAY'S MUSIC REC's",
      color: "#FFFFF3",
      position_x: 70,
      position_y: 150,
      is_prompt: true,
      rotation: 0,
      z_index: 5
    },
    {
      id: 'default-2',
      content: "Write a new part of a story from the notes around you.",
      color: "#FFFFF3",
      position_x: 825,
      position_y: 300,
      is_prompt: true,
      rotation: 0,
      z_index: 5
    },
    {
      id: 'default-3',
      content: "Share your most random thought.",
      color: "#FFFFF3",
      position_x: 600,
      position_y: 50,
      is_prompt: true,
      rotation: 0,
      z_index: 5
    }
  ];

  const [showClockOverlay, setShowClockOverlay] = useState(false);
  const [showNoteOverlay, setShowNoteOverlay] = useState(false);
  const [showWriteOverlay, setShowWriteOverlay] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // State for storing notes data and UI states
  const [notes, setNotes] = useState([]); // Regular notes
  const [prompts, setPrompts] = useState(defaultPrompts); // Initialize with default prompts
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message if fetch fails
  const [boardDimensions, setBoardDimensions] = useState({ width: 0, height: 0 });
  const [clickPosition, setClickPosition] = useState({ x: 0.5, y: 0.5 });
  
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

  const isBoardClickable = !showClockOverlay && !showNoteOverlay && !showWriteOverlay;
  
  // Handler for when a note is clicked to view details
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowNoteOverlay(true);
  };

  const handleBoardClick = (e) => {
    // Calculate position relative to board (0-1 range)
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const posX = (e.clientX - rect.left) / rect.width;
      const posY = (e.clientY - rect.top) / rect.height;
      
      // Store position for use when creating note
      setClickPosition({ x: posX, y: posY });
    }
    setShowWriteOverlay(true);
  };

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

  // Function to fetch notes from the API
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
        
        // Add any prompts from API to our default prompts
        // This ensures we always show at least the default prompts
        const allPrompts = [...defaultPrompts, ...fetchedPrompts];
        
        // Update state with the fetched data
        setPrompts(allPrompts);
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

  // Save a note to the API
  const saveNote = async (noteData) => {
    try {
      console.log("Saving note with data:", noteData);
      
      // Convert position values from 0-1 range to pixels (as expected by backend)
      const dataToSend = {
        content: noteData.content,
        color: noteData.color,
        position_x: noteData.position_x * 1000, // Convert to pixels
        position_y: noteData.position_y * 500   // Convert to pixels
        // Removed user_id field - let the backend handle it
      };
      
      const response = await fetch('/api/bulletin-board/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Note saved successfully:", data);
      
      // Refresh notes to show the newly created note
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save your note. Please try again.");
    }
  };
  
  // Archive a note (save to personal board)
  const archiveNote = async (note) => {
    try {
      console.log("Archiving note:", note);
      
      // The backend requires a user_id field
      const dataToSend = {
        user_id: 'system_user', // Use the same system user as when creating notes
        position_x: note.position_x / 1000, // Convert back to 0-1 range
        position_y: note.position_y / 500   // Convert back to 0-1 range
      };
      
      console.log("Archive data sending:", dataToSend);
      
      const response = await fetch(`/api/bulletin-board/notes/${note.id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Note archived successfully:", data);
      alert("Note saved to your personal board!");
    } catch (err) {
      console.error("Error archiving note:", err);
      alert("Failed to archive note. Please try again.");
    }
  };

  // Effect hook to fetch notes data when component mounts
  useEffect(() => {
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

      {/* Main board container */}
      <div 
        ref={boardRef}
        className="board" 
        style={{ 
          position: 'relative', 
          minHeight: '600px',
          cursor: !showClockOverlay && !showNoteOverlay ? 'crosshair' : 'default',
          backgroundColor: '#ffffff'
        }}
        onLoad={updateBoardDimensions}
        onClick={(e) => {
          if (isBoardClickable) {
            handleBoardClick(e);
          }
        }}
      >
        {/* Conditional rendering of clock overlay */}
        {showClockOverlay && <ClockOverlay onClose={() => setShowClockOverlay(false)} />}
        
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
              onClick={(e) => {
              e.stopPropagation(); // Prevent click from reaching the board
              handleNoteClick(note);
            }}
            >
              {note.content}
            </div>
          );
        })}
      </div>

      {/* Conditional rendering of other overlays */}
      {showWriteOverlay && (
        <WriteNoteOverlay 
          position={clickPosition}
          onClose={() => setShowWriteOverlay(false)} 
          onSave={(noteData) => {
            saveNote(noteData);
            setShowWriteOverlay(false);
          }}
        />
      )}

      {showNoteOverlay && selectedNote && (
        <ViewNoteOverlay
          note={selectedNote}
          onClose={() => {
            setShowNoteOverlay(false);
            setSelectedNote(null);
          }}
          onArchive={(note) => {
            archiveNote(note);
            setShowNoteOverlay(false);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
};

export default PageBulletinBoard;
