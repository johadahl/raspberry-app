import React from 'react';
import './App.css';
import { Greetings } from './components/Greetings';
import { Settings } from './components/Settings';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Greetings date={new Date()}/>
        <Settings />
      </header>
    </div>
  );
}

export default App;
