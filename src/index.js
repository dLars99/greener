/* This is the initial parent module for the app */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import Greener from "./Greener"

ReactDOM.render(
  <Router>
    <Greener />
  </Router>,
  document.getElementById('root')
);
