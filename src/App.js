import React from "react";
import "./App.css";
import Game from "./components/Game";
import StartGameForm from "./components/StartGameForm";
import music from "./sounds/Pokemon-BattleMusic.mp3";

function App() {
  // form input
  const [input, setInput] = React.useState("");
  // pokemon data
  const [pokemon, setPokemon] = React.useState("");
  const [randomPokemon, setRandomPokemon] = React.useState("");
  // error message
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <main>
      <h1 className="title">Let's Go Pokemon Battle!</h1>
      <audio>
        <source src={music}></source>
      </audio>
      <audio id="action-sound">
        <source></source>
      </audio>
      {pokemon && randomPokemon ? (
        <Game
          pokemon={pokemon}
          setPokemon={setPokemon}
          randomPokemon={randomPokemon}
          setRandomPokemon={setRandomPokemon}
        />
      ) : (
        <StartGameForm
          input={input}
          setInput={setInput}
          pokemon={pokemon}
          setPokemon={setPokemon}
          randomPokemon={randomPokemon}
          setRandomPokemon={setRandomPokemon}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </main>
  );
}

export default App;
