import React from "react";
import getPokemonData from "../getPokemonData";
import DisplayPokemon from "./DisplayPokemon";

const DisplayForm = () => {
  const [input, setInput] = React.useState("");
  const [pokemon, setPokemon] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    getPokemonData(input).then((data) => {
      const PokeData = {
        name: data.name,
        image: data.sprites.front_default,
        hp: data.stats["5"].base_stat,
      };

      console.log(PokeData);
      setPokemon(PokeData);
    });

    return DisplayPokemon(pokemon);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="select-pokemon-form">
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
      <button method="get">Generate Random Pokemon</button>
    </div>
  );
};

export default DisplayForm;
