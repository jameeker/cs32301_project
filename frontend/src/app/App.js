import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
// Importing Stuff
import { PageBulletinBoard, PagePersonalBoard, PageAbout, HowTo, ClockStats, ViewNote, WriteNote, PageTrash } from '../pages';
import { UrlDisplay } from '../components';

function App() {
    return (
    <Router basename="">
      <div className="App">
        <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
          <UrlDisplay />
        </div>
      <Switch>
          <Route exact path="/" component={PageBulletinBoard} />
          <Route path="/personal-board" component={PagePersonalBoard} />
          <Route path="/about" component={PageAbout} />
          <Route path="/how-to" component={HowTo} />
          <Route path="/clock-stats" component={ClockStats} />
          <Route path="/view-note" component={ViewNote} />
          <Route path="/write-note" component={WriteNote} />
          <Route path="/trash" component={PageTrash} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
