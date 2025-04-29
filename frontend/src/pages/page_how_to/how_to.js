import React, { useState } from 'react';
import { NavButtonBar, UrlDisplay } from '../../components';
import './how_to.css';

const HowTo = () => {
  // State to control the visibility of example overlays
  const [showWriteExample, setShowWriteExample] = useState(false);
  const [showViewExample, setShowViewExample] = useState(false);
  const [showTrashExample, setShowTrashExample] = useState(false);
  const [selectedNoteColor, setSelectedNoteColor] = useState(null);

  // Function to handle click on the mini board to create a note
  const handleCreateNoteClick = () => {
    setShowWriteExample(true);
  };

  // Function to handle click on a sample note
  const handleViewNoteClick = (color) => {
    setSelectedNoteColor(color);
    setShowViewExample(true);
  };
  
  // Function to handle click on a personal note that can be trashed
  const handleTrashNoteClick = (color) => {
    setSelectedNoteColor(color);
    setShowTrashExample(true);
  };

  return (
    <div className="howto-page">
      <div className="howto-container">
        <h1>How to Use the Bulletin Board</h1>
        
        {/* Section 1: Creating Notes */}
        <div className="section">
          <h2 className="section-title">Feature 1: Writing Notes</h2>
          <p className="instruction-text">
            You can interact with the community bulletin board by writing notes. 
            Click on any blank empty space areas on the board to create your own new note. 
            Click 'Save' to paste your note on the board.
          </p>
          
          {/* Mini board for creating notes */}
          <div className="mini-board" onClick={handleCreateNoteClick}>
            <div className="red-arrow">
              Click here
              <div className="arrow-down"></div>
            </div>
          </div>
          
          <p className="character-limit">
            You can choose a color for your note and write any message off plaintext or ASCII. Notes have a limit of 200 characters.
          </p>
        </div>
        
        {/* Section 2: Viewing Notes */}
        <div className="section">
          <h2 className="section-title">Feature 2: Viewing Notes</h2>
          <p className="instruction-text">
            Users can click on any of the existing notes to get a closer look and view it in detail. You can click 'Archive' to save any particular note to your private personal board.
          </p>
          
          {/* Mini board with sample notes */}
          <div className="mini-board">
            <div 
              className="sample-note yellow" 
              style={{top: '30px', left: '50px'}}
              onClick={() => handleViewNoteClick('#ffffcc')}
            >
              <div className="example-header">Sample Note</div>
              <div>Click to view</div>
            </div>
            
            <div 
              className="sample-note pink" 
              style={{top: '100px', left: '200px'}}
              onClick={() => handleViewNoteClick('#ffccff')}
            >
              <div className="example-header">Another Note</div>
              <div>Try me!</div>
            </div>
          </div>
        </div>

        {/* Section 3: Trashing Notes */}
        <div className="section">
          <h2 className="section-title">Feature 3: Trashing Notes</h2>
          <p className="instruction-text">
            On your own personal bulletin board, you can manage your notes by archiving public notes, creating new ones, or trashing notes you may not want anymore. Click on any note to view it and then click 'Trash' to remove it.
          </p>
          
          {/* Mini personal board with sample notes */}
          <div className="mini-board" style={{background: '#f5f5f5'}}>
            <div 
              className="sample-note yellow" 
              style={{top: '20px', left: '30px'}}
              onClick={() => handleTrashNoteClick('#ffffcc')}
            >
              <div className="example-header">a personal note</div>
              <div>Click to trash</div>
            </div>
            
            <div 
              className="sample-note green" 
              style={{top: '60px', left: '120px'}}
              onClick={() => handleTrashNoteClick('#ccffcc')}
            >
              <div className="example-header">saved note</div>
              <div>XD</div>
            </div>
            
            <div 
              className="sample-note blue" 
              style={{top: '100px', left: '220px'}}
              onClick={() => handleTrashNoteClick('#ccffff')}
            >
              <div className="example-header">Trash</div>
              <div>a note you don't need anymore</div>
            </div>
          </div>
          
          <p className="character-limit">
            Trashed notes are moved to the community dump where they stay with other trashed notes. Users can recover old notes if they choose to, or even find secrets.
          </p>
        </div>
        
        {/* Section 4: Additional Features */}
        <div className="section">
          <h2 className="section-title">Additional Features</h2>
          <ul>
            <li>Notes expire after 24 hours</li>
            <li>Use the Trash page to explore old notes or clean up your board</li>
          </ul>
        </div>
        
        {/* Write Note Example Overlay - Simplified to match actual component */}
        {showWriteExample && (
          <div className="example-overlay" style={{display: 'flex'}} onClick={() => setShowWriteExample(false)}>
            <div className="example-modal" style={{backgroundColor: '#ffffcc'}} onClick={(e) => e.stopPropagation()}>
              <div className="close-x" onClick={() => setShowWriteExample(false)}>×</div>
              <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <input 
                  type="text" 
                  style={{
                    marginBottom: '10px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1.1em',
                    fontFamily: '"Atkinson Hyperlegible Mono", monospace',
                    width: '100%'
                  }} 
                  placeholder="Title..." 
                />
                <textarea 
                  style={{
                    flex: 1,
                    minHeight: '150px',
                    resize: 'none',
                    border: 'none',
                    background: 'transparent',
                    fontFamily: '"Atkinson Hyperlegible Mono", monospace',
                    fontSize: '1em',
                    marginBottom: '50px'
                  }} 
                  placeholder="Write your note here..."
                ></textarea>
                <div style={{display: 'flex', justifyContent: 'center', gap: '10px', margin: '15px 0'}}>
                  {['#ffffcc', '#ccffcc', '#ccffff', '#ffccff'].map((color, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: color,
                        borderRadius: '4px',
                        border: color === '#ffffcc' ? '2px solid #333' : '2px solid transparent',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
                <button 
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* View Note Example Overlay - Simplified to match actual component */}
        {showViewExample && (
          <div className="example-overlay" style={{display: 'flex'}} onClick={() => setShowViewExample(false)}>
            <div className="example-modal" style={{
              backgroundColor: selectedNoteColor, 
              fontFamily: '"Atkinson Hyperlegible Mono", monospace'
            }} onClick={(e) => e.stopPropagation()}>
              <div className="close-x" onClick={() => setShowViewExample(false)}>×</div>
              <h2 style={{
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: '"Atkinson Hyperlegible Mono", monospace'
              }}>
                Sample Note Title
              </h2>
              <p style={{
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                fontSize: '16px',
                fontFamily: '"Atkinson Hyperlegible Mono", monospace'
              }}>
                This is how your note appears when someone clicks on it. Users can read the full content here.
              </p>
              <button style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                padding: '8px 16px',
                backgroundColor: '#3b83e1', // Blue color for archive button
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                Archive
              </button>
            </div>
          </div>
        )}
        
        {/* Trash Note Example Overlay - Simplified to match view_note_personal component */}
        {showTrashExample && (
          <div className="example-overlay" style={{display: 'flex'}} onClick={() => setShowTrashExample(false)}>
            <div className="example-modal" style={{
              backgroundColor: selectedNoteColor, 
              fontFamily: '"Atkinson Hyperlegible Mono", monospace'
            }} onClick={(e) => e.stopPropagation()}>
              <div className="close-x" onClick={() => setShowTrashExample(false)}>×</div>
              <h2 style={{
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: '"Atkinson Hyperlegible Mono", monospace'
              }}>
                Personal Note Title
              </h2>
              <p style={{
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                fontSize: '16px',
                fontFamily: '"Atkinson Hyperlegible Mono", monospace'
              }}>
                This is a note from your personal board. You can remove it by clicking the Trash button.
              </p>
              <button style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                padding: '8px 16px',
                backgroundColor: '#e13b3b', // Red color for trash button
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                Trash
              </button>
            </div>
          </div>
        )}
        
        {/* Keep navigation components */}
        <NavButtonBar />
        <UrlDisplay />
      </div>
    </div>
  );
};

export default HowTo;
