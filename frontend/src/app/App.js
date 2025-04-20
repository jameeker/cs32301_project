import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

<<<<<<< HEAD
import { PageBulletinBoard, PagePersonalBoard, PageAbout, HowTo, ClockStats, ViewNote } from '../pages';
=======
import { PageBulletinBoard, PagePersonalBoard, PageAbout, HowTo, ClockStats, PageViewNote } from '../pages';
>>>>>>> 0e97a0d83542cfdfa413f5d2b10213583d0fdf24

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
<<<<<<< HEAD
          <Route path="/view-note" component={ViewNote} />
=======
          <Route path="/view-note" component={PageViewNote} />
>>>>>>> 0e97a0d83542cfdfa413f5d2b10213583d0fdf24
        </Switch>
      </div>
    </Router>
  );
}

export default App;