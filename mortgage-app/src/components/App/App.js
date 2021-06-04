import { useState, useEffect } from 'react';
import {
  Redirect,
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Navbar, MortgageCalc } from '../_index';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <h1>App</h1>
        <MortgageCalc />
      </div>
    </Router>
  );
}

export default App;
