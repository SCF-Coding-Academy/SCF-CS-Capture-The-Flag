/**
 * Digital Capture the Flag Activity
 * @version 01.18.22
 * @author MrH-rezroll
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Team from './model/team';
require('./assets/buttonClickTeam1.wav');
require('./assets/buttonClickTeam2.wav');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App team1={new Team("Team A")} team2={new Team("Team B")} keys={{
        w: false,
        a: false,
        s: false,
        d: false,
        up: false,
        down: false,
        left: false,
        right: false
      }} 
      menuSelectSound={new Audio(require('./assets/menuSelect.wav'))} 
      menuSelectSound2={new Audio(require('./assets/buttonClickTeam1.wav'))}
      menuSelectSound3={new Audio(require('./assets/buttonClickTeam2.wav'))}
      finishClickSound={new Audio(require('./assets/finishSelect.wav'))}
      winSound={new Audio(require('./assets/winSound.wav'))}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
