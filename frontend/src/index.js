// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import{BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')  


);


