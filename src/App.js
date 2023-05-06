import { useState, useEffect } from 'react';
import './App.css';
import { Character } from "./classes";
import CharacterSheet from './components/CharacterSheet';

function App() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const bobby = new Character("bobby");
    const jane = new Character("jane");
    setCharacters({bobby: bobby, jane: jane});
  }, []);

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {Object.values(characters).map((character, index) => <CharacterSheet key={index} {...{character}} {...{characters}} {...{setCharacters}}/>)}
      </section>
    </div>
  );
}

export default App;
