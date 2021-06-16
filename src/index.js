import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "./components/members/profile.css"
import Global from './pages/global';
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router'

ReactDOM.render(
  <BrowserRouter><Router/></BrowserRouter>,
  document.getElementById('root')
);