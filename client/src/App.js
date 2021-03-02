import React from 'react';
import './App.css';
import {Router, Redirect} from '@reach/router';

import AllPirate from './Components/AllPirate';
import CreatePirate from './Components/CreatePriate';
import ShowPirate from './Components/ShowPriate';
import EditPirate from './Components/EditPriate';

function App() {
  return (
    <div className="App">
      <Router>
        <AllPirate path="/pirate"/>   
        <CreatePirate path="/pirate/new"/>
        <ShowPirate path="/pirate/:id"/>
        <EditPirate path="/pirate/:id/edit"/>
      </Router>
      <Redirect from="/" to="/pirate" noThrow/> 
    </div>
  );
}

export default App;
