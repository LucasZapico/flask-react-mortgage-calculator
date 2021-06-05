import { MortgageCalc, Navbar } from '../_index';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <h1 className="h4">Mortgage Calculator</h1>
        <MortgageCalc />
      </div>
    </Router>
  );
}

export default App;
