import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';


function App() {

  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Number of clicks: { value }</p>
        <button onClick={ () => setValue(value + 1) }>Click this</button>
      </header>
    </div>
  );
}

export default App;
