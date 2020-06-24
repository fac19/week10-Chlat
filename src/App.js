import React from "react";
import "./App.css";
import "./components/Buttons.css";
import "./components/MovesButtons.css";
import Game from "./components/Game";
import StartGameForm from "./components/StartGameForm";
import music from "./sounds/Pokemon-BattleMusic.mp3";
import updateState from "./Context/updateState";
import initialState from "./Context/initialState";
import MyContext from "./Context/context";

function App() {
  const [state, dispatch] = React.useReducer(updateState, initialState);
  // form input
  const [input, setInput] = React.useState("");
  // pokemon data
  const [pokemon, setPokemon] = React.useState("");
  const [randomPokemon, setRandomPokemon] = React.useState("");
  // error message
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <MyContext.Provider value={{ state, dispatch }}>
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
    </MyContext.Provider>
  );
}

export default App;
