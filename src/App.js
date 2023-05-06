import { useState, useEffect } from 'react';
import './App.css';
import { Character } from "./classes";
import CharacterSheet from './components/CharacterSheet';

function App() {

  const [characters, setCharacters] = useState({bobby: new Character("bobby"), jane: new Character("jane")});

  const handleSaveCharacters = async () => {
    let requestInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(characters)
    }
    const apiEndpoint = "https://recruiting.verylongdomaintotestwith.ca/api/ksg604/character";
    const response = await fetch(apiEndpoint, requestInit);
    console.log(response);
  }

  const handleGetCharacters = async () => {
    let requestInit = {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }
    const apiEndpoint = "https://recruiting.verylongdomaintotestwith.ca/api/ksg604/character";
    const response = await fetch(apiEndpoint, requestInit);
    const json = await response.json();
    let characters = {};
    Object.values(json.body).forEach(character => {
      characters[character.name] = new Character(character.name);
      characters[character.name].setSkillPoints = character.skillPoints;
      characters[character.name].setSkills = character.skills;
      characters[character.name].setAttributes = character.attributes;
    });
    setCharacters(characters);
  }

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  useEffect(() => {
    handleGetCharacters();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <button onClick={handleGetCharacters}>Get Characters</button>
      <button onClick={handleSaveCharacters}>Save</button>
      <section className="App-section">
        {Object.values(characters).map((character, index) => <CharacterSheet key={index} {...{character}} {...{characters}} {...{setCharacters}}/>)}
      </section>
    </div>
  );
}

export default App;
