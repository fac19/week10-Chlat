import React from "react";
import "./App.css";
import Game from "./components/Game";
import StartGameForm from "./components/StartGameForm";

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
