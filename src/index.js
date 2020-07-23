import React from 'react';
import ReactDOM from 'react-dom';
import {BrowerRouter as Router} from "react-router-dom"
import './index.css';
import Greener from "./Greener"

ReactDOM.render(
  <Router>
    <Greener />
  </Router>,
  document.getElementById('root')
);
