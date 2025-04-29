import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavButtonBar } from '../../components';
import ViewNotePersonalOverlay from '../page_view_note_personal/view_note_personal';
import WriteNoteOverlay from '../page_write_note/write_note';
import { getClientId } from '../../utils/utils';
import './personal_board.css';

// Import Background Images
import bgAdobe from '../../assets/backgrounds/AdobeStock_1376412387.jpeg';
import bgWhite from '../../assets/backgrounds/background_white.jpg';
import bgSquiggles from '../../assets/backgrounds/pexels-dom-j-7304-310452.jpg';
import bgSky from '../../assets/backgrounds/pexels-padrinan-19670.jpg';
import bgDots from '../../assets/backgrounds/pexels-padrinan-255379.jpg';
import bgPaint from '../../assets/backgrounds/pexels-steve-1269968.jpg';
import bgRain from '../../assets/backgrounds/pexels-jplenio-2259232.jpg'
import bgSoftWood from '../../assets/backgrounds/pexels-pixabay-301717.jpg'
import bgYellowWood from '../../assets/backgrounds/pexels-pixabay-326347.jpg'
import bgGrunge from '../../assets/backgrounds/pexels-timmossholder-936800.jpg'

const backgrounds = [
  bgAdobe, // Set Adobe Stock image as default background
  bgSoftWood,
  bgSquiggles,
  bgSky,
  bgWhite,
  bgDots,
  bgPaint,
  bgRain,
  bgYellowWood,
  bgGrunge
];

const PagePersonalBoard = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [showNoteOverlay, setShowNoteOverlay] = useState(false);
  const [showWriteOverlay, setShowWriteOverlay] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0.5, y: 0.5 });
  const history = useHistory(); 

  // Function to trash a note by moving it to the trash section
  const trashNote = async (note) => {
    try {
      // Extract the original note ID (removing the 1000 offset we added for display)
      const originalNoteId = note.id > 1000 ? note.id - 1000 : note.id;
      
      console.log("Trashing note with ID:", originalNoteId);
      
      console.log(`Using note ID: ${originalNoteId} to call trash endpoint`);
      
      // Call the API to move the note to trash
      const response = await fetch(`http://127.0.0.1:5000/api/personal-board/notes/${originalNoteId}/trash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: 'system_user'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Note trashed successfully:", data);
      
      // Refresh notes to remove the trashed note from the board
      fetchSavedNotes();
    } catch (err) {
      console.error("Error trashing note:", err);
      alert("Failed to move note to trash. Please try again.");
    }
  };

  // Function to fetch saved notes from the API
  const fetchSavedNotes = async () => {
    try {
      setLoading(true);
      console.log("Fetching saved notes from API...");
      
      // Use system_user for fetching notes to match the ID we use for saving
      // This ensures consistency between saving and viewing notes
      const response = await fetch(`/api/personal-board/notes?client_id=system_user`);
      
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      console.log("API response data:", data);
      
      // Update state with the fetched data
      setSavedNotes(data);
    } catch (err) {
      // Handle any errors that occurred during fetch
      console.error("Error fetching saved notes:", err);
      setError("Failed to load saved notes. Please try again later.");
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };
  
  // Fetch saved notes when component mounts
  useEffect(() => {
    fetchSavedNotes();
  }, []);

  const handleNoteClick = (note) => {
    // Create a modified note that the ViewNoteOverlay component can use
    // ViewNoteOverlay expects a note with a 'content' property, but our notes have 'header' and 'body'
    const modifiedNote = {
      ...note,
      content: note.header ? `${note.header}\n\n${note.body}` : note.body
    };
    setSelectedNote(modifiedNote);
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

  // Use state for hardcoded notes so we can update them
  const [hardcodedNotes, setHardcodedNotes] = useState([
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
  ]);

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

  // Convert API note format to match hardcoded notes format
  const formatApiNote = (apiNote) => {
    // Split content into header and body if it contains two newlines
    let header = '';
    let body = apiNote.content;
    
    if (apiNote.content) {
      const parts = apiNote.content.split('\n\n');
      if (parts.length > 1) {
        header = parts[0];
        body = parts.slice(1).join('\n\n');
      }
    }
    
    return {
      id: apiNote.id + 1000, // Add 1000 to avoid ID conflicts with hardcoded notes
      header: header,
      body: body,
      color: apiNote.color || '#ffd3b6',
      position_x: apiNote.position_x || 500,
      position_y: apiNote.position_y || 200
    };
  };
  
  // Combine hardcoded notes with API-fetched notes
  const allNotes = [
    ...hardcodedNotes.filter(note => !note.isDeleted), // Only show non-deleted hardcoded notes
    ...savedNotes.map(formatApiNote)
  ];

  // Helper function to remove a note from the local notes array
  const removeNoteFromBoard = (noteId) => {
    console.log(`Removing note with ID ${noteId} from board`);
    
    if (noteId <= 12) {
      // If it's a hardcoded note (ID 1-12), mark it as deleted
      setHardcodedNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === noteId ? {...note, isDeleted: true} : note
        )
      );
    }
    
    // Refresh the board
    setSelectedNote(null);
    fetchSavedNotes();
  };

  // Handler for when the board is clicked (to create a new note)
  const handleBoardClick = (e) => {
    // Calculate position relative to board (0-1 range)
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width;
    const posY = (e.clientY - rect.top) / rect.height;
    
    // Store position for use when creating note
    setClickPosition({ x: posX, y: posY });
    setShowWriteOverlay(true);
  };
  
  // Function to handle saving a new note
  const saveNote = async (noteData) => {
    try {
      console.log("Saving note with data:", noteData);
      
      // Get the client ID for the current user
      const clientId = getClientId();
      
      // Convert position from 0-1 range to pixels (expected by the backend)
      const dataToSend = {
        ...noteData,
        position_x: noteData.position_x * 1000, // Convert to pixels
        position_y: noteData.position_y * 500,  // Convert to pixels
        client_id: 'system_user' // Changed from user_id to client_id to match backend expectation
      };
      
      console.log("Sending data to API:", dataToSend);
      
      // Call the API to save the note
      const response = await fetch('/api/personal-board/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const savedNote = await response.json();
      console.log("Note saved successfully:", savedNote);
      
      // Refresh the notes list to show the newly created note
      fetchSavedNotes();
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save your note. Please try again.");
    }
  };

  return (
    <div className="personal-board" style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}>
      <h1 style={{ color: 'white' }}>Personal Bulletin Board</h1>

      <div className="board" onClick={handleBoardClick}>
        <NavButtonBar />
        
        {/* Display any loading or error state */}
        {loading && <div className="loading-indicator">Loading saved notes...</div>}
        {error && <div className="error-message">{error}</div>}

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

        {allNotes.map(note => (
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

      <div className="button-container">
        <button className="arrow" onClick={() => changeBackground('prev')}>◀</button>
        <button className="arrow" onClick={() => changeBackground('next')}>▶</button>
        <button className="trash-can" onClick={() => history.push('/trash')}>🗑️</button>
      </div>

      {showNoteOverlay && selectedNote && (
        <ViewNotePersonalOverlay
          note={selectedNote}
          onClose={() => {
            setShowNoteOverlay(false);
            setSelectedNote(null);
          }}
          onTrash={(note) => {
            // For hardcoded notes (id less than or equal to 12), just mark as deleted locally
            if (note.id <= 12) {
              removeNoteFromBoard(note.id);
              setShowNoteOverlay(false);
              setSelectedNote(null);
            } else {
              // For API-created notes, use the API
              trashNote(note);
              setShowNoteOverlay(false);
              setSelectedNote(null);
            }
          }}
        />
      )}
      
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
    </div>
  );
};

export default PagePersonalBoard;
