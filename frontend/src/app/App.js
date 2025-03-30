import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

import { PageBulletinBoard, PagePersonalBoard, PageAbout, HowTo } from '../pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PageBulletinBoard />
          {/* <PagePersonalBoard/> */}

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
