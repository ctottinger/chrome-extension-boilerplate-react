import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://developer.chrome.com/docs/extensions/reference/storage/#usage"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome Storage
        </a>
      </header>
    </div>
  );
};

export default Popup;
