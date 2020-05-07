import React from "react";
import "./App.css";
import getPokemonData from "./getPokemonData.js";
import DisplayPokemon from "./components/DisplayPokemon";

function App() {
  const [input, setInput] = React.useState("");
  const [pokemon, setPokemon] = React.useState("");
  const [randomPokemon, setRandomPokemon] = React.useState("");

  const createPokeData = ((data) => {
    const PokeData = {
      name: data.name,
      image: data.sprites.front_default,
      hp: data.stats["5"].base_stat,
    }
    return PokeData;
  })


  const handleClick = (event) => {
    event.preventDefault();

    if (event.type !== 'submit'){
      const genId = Math.floor(Math.random() * 151) + 1;
    
         getPokemonData(genId)
           .then(createPokeData)
           .then(PokeData => setPokemon(PokeData))
           .catch(console.error);  
           getRandmon();

    }

    if(!input) return

    getPokemonData(input)
      .then(createPokeData)
      .then(PokeData => setPokemon(PokeData))
      .catch(console.error);
      getRandmon()
  };


const getRandmon = () => {
  const randomId = Math.floor(Math.random() * 151) + 1;
    
  getPokemonData(randomId)
    .then(createPokeData)
    .then(PokeData => setRandomPokemon(PokeData))
    .catch(console.error);
}
    

  return (
    
    <main>
      <div>
        <form onSubmit={handleClick} className="select-pokemon-form">
          <p>Please Choose A Pokemon</p>
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
      {pokemon ? (
        <div>
          <DisplayPokemon
            name={pokemon.name}
            image={pokemon.image}
            hp={pokemon.hp}
          />
          <DisplayPokemon
          name={randomPokemon.name}
          image={randomPokemon.image}
          hp={randomPokemon.hp}
        />
        </div>
      ) : (
        <div>
          <h1>Please Select A Pokemon?</h1>
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
