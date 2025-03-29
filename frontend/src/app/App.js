import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

// import BulletinBoard from '../pages/bulletin_board/bulletin_board.js';
// import BulletinBoard from '../pages/bulletin_board';
// import PersonalBoard from '../pages/personal_board';
import { BulletinBoard, PersonalBoard, About, HowTo } from '../pages';

function App() {
  return (
    <Router>
      <div className="App">
        <BulletinBoard />
        {/* <PersonalBoard/> */}

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
    </div>
    </Router>
  );
}

export default App;
