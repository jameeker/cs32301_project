import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

import { PageBulletinBoard, PagePersonalBoard, PageAbout, HowTo, ClockStats } from '../pages';

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path="/" component={PageBulletinBoard} />
          <Route path="/personal-board" component={PagePersonalBoard} />
          <Route path="/about" component={PageAbout} />
          <Route path="/how-to" component={HowTo} />
          <Route path="/clock-stats" component={ClockStats} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;