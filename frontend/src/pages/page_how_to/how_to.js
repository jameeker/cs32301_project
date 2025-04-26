import React, { useEffect } from 'react';
import { HomeButton, NavButtonBar } from '../../components';
import './how_to.css';

const HowTo = () => {
<<<<<<< HEAD

  useEffect(() => {
    // Fetch how-to data if needed
    const fetchHowToData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/how-to');
        if (response.ok) {
          const data = await response.json();
          console.log("How-to data:", data);
          // You can set state with the data here if needed
        }
      } catch (error) {
        console.error("Error fetching how-to data:", error);
      }
    };
    
    // Uncomment to enable API fetch
    // fetchHowToData();
  }, []);

=======
>>>>>>> dev/frontend
  return (
    <div className="howto-page">
      <h1>How to Use the Bulletin Board</h1>
      <ol>
        <li>Click on the bulletin board to add a new note</li>
        <li>Choose a color for your note</li>
        <li>Write your message (limit: 200 characters)</li>
        <li>Click "Place Note" to add it to the board</li>
        <li>Notes expire after 24 hours</li>
        <li>You can save notes to your personal board</li>
      </ol>
      
      {/* Only include NavButtonBar, not HomeButton since this is the How-to page */}
      <NavButtonBar />
    </div>
  );
<<<<<<< HEAD


=======
>>>>>>> dev/frontend
};

export default HowTo;
