import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import cookie from 'react-cookie';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
// import './js/script.js';
// import './js/jquery.mousewheel.js';
// import './js/disable-scroll.js';
// import ReactGA from 'react-ga';
// import { AUTH_USER } from './actions/types';

// // Import stylesheets
// import './public/stylesheets/base.scss';

// // Initialize Google Analytics
// ReactGA.initialize('UA-000000-01');

// function logPageView() {
//   ReactGA.pageview(window.location.pathname);
// }

// NOT USING REDUX
// const token = cookie.load('token');

// if (token) {
//   // Update application state. User has token and is probably authenticated
//   store.dispatch({ type: AUTH_USER });
// }

ReactDOM.render(
  <div>
    <Router history={browserHistory} routes={routes} />
  </div>,
  document.querySelector('.wrapper'));
