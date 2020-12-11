import './App.css';
import React from 'react'

import TonePad from './Components/TonePad'

function App() {

  const handleTouchStart = () => {
    document.getElementById('welcome').remove();
  };

  return (
    <div className="App-body">
      <div id="welcome" className="welcome" onTouchStart={handleTouchStart}>
        <h1>Welcome to Synth</h1>
        <p>Press Anywhere to Play!</p>
      </div>
        <TonePad />
    </div>
  );
}

export default App;
