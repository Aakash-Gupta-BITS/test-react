import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "./components/ProfileCard/profile.css"
import Router from './routes/router'

ReactDOM.render(
  <Router/>,
  document.getElementById('root')
);