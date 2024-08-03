import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/Component/App/App';
// import Station from "../src/Component/Station/station"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Station/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

