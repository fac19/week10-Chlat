import React from "react";
import "./App.css";
import getPokemonData from "./getPokemonData.js";
import DisplayPokemon from "./components/DisplayPokemon";
import Buttons from "./components/Buttons";

function App() {
  // form input
  const [input, setInput] = React.useState("");
  // pokemon data
  const [pokemon, setPokemon] = React.useState("");
  const [randomPokemon, setRandomPokemon] = React.useState("");

  // creates object with pokemon data
  const createPokeData = (data) => {
    const PokeData = {
      name: data.name,
      image: data.sprites.front_default,
      hp: data.stats["5"].base_stat,
      move:
        data.moves[Math.floor(Math.random() * data.moves.length)].move["name"],
    };
    return PokeData;
  };

  // handles click events on form and button
  const handleClick = (event) => {
    event.preventDefault();

    if (event.type !== "submit") {
      const genId = Math.floor(Math.random() * 151) + 1;

      getPokemonData(genId)
        .then(createPokeData)
        .then((PokeData) => setPokemon(PokeData))
        .catch(console.error);
      getRandmon();
    }

    if (!input) return;

    getPokemonData(input)
      .then(createPokeData)
      .then((PokeData) => setPokemon(PokeData))
      .catch(console.error);
    getRandmon();
  };

  const getRandmon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;

    getPokemonData(randomId)
      .then(createPokeData)
      .then((PokeData) => setRandomPokemon(PokeData))
      .catch(console.error);
  };

  return (
    <main>
      <div>
        <form onSubmit={handleClick} className="select-pokemon-form">
          <p>Choose A Pokemon</p>
          <label htmlFor="pokemon-name">
            <input
              type="text"
              name="pokemon-name"
              id="pokemon-name"
              placeholder="ditto"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></input>
          </label>
          <button type="submit">I Choose You!</button>
        </form>
        <button onClick={handleClick}>Generate Random Pokemon</button>
      </div>
      {pokemon && randomPokemon ? (
        <div>
          <DisplayPokemon name={pokemon.name} image={pokemon.image} />
          <DisplayPokemon
            name={randomPokemon.name}
            image={randomPokemon.image}
          />
          <Buttons pokemon={pokemon} randomPokemon={randomPokemon} />
        </div>
      ) : (
        <div>
          <h1>Please Select A Pokemon</h1>
          <img
            src="https://media2.giphy.com/media/JgCZ2hksM1abS/source.gif"
            alt="pokeball"
            width="100px"
          ></img>
        </div>
      )}
    </main>
  );
}

export default App;
