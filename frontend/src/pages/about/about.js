import React from 'react';
import { HomeButton, NavButtonBar } from '../../components';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About the Bulletin Board</h1>
      <p>This is an interactive, anonymous online community bulletin board where users can leave messages and interact with others freely.</p>
      <p>Everything on the board expires after 24 hours, ensuring a fresh and comfortable space for interaction.</p>
      
      {/* Only include NavButtonBar, not HomeButton since this is the About page */}
      <NavButtonBar />
    </div>
  );
};

export default About;