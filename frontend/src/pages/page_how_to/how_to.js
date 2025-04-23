import React from 'react';
import { HomeButton, NavButtonBar } from '../../components';
import './how_to.css';

const HowTo = () => {

  useEffect(() => {
    const response = fetch('http://localhost:5000/api/how_to/');
  }, []);

  // return (
  //   <div className="howto-page">
  //     <h1>How to Use the Bulletin Board</h1>
  //     <ol>
  //       <li>Click on the bulletin board to add a new note</li>
  //       <li>Choose a color for your note</li>
  //       <li>Write your message (limit: 200 characters)</li>
  //       <li>Click "Place Note" to add it to the board</li>
  //       <li>Notes expire after 24 hours</li>
  //       <li>You can save notes to your personal board</li>
  //     </ol>
      
  //     {/* Only include NavButtonBar, not HomeButton since this is the How-to page */}
  //     <NavButtonBar />
  //   </div>
  // );


};

export default HowTo;