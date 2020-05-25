import React from "react";
import getPokemonData from "../utils/getPokemonData";
import playAudio from "../utils/playAudio";
import getMovesData from "../utils/getMovesData";

const StartGameForm = (props) => {
  // function that generates opponent's pokemon
  React.useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1;

    getPokemonData(randomId)
      .then(createPokeData)
      .then((PokeData) => props.setRandomPokemon(PokeData))
      .catch(console.error);
  }, [props.pokemon]);

  // creates object with pokemon data
  const createPokeData = (data) => {
    const PokeData = {
      name: data.name,
      image: data.sprites.front_default,
      hp: data.stats["5"].base_stat,
      moves: [
        data.moves[Math.floor(Math.random() * data.moves.length)].move["name"],
        data.moves[Math.floor(Math.random() * data.moves.length)].move["name"],
        data.moves[Math.floor(Math.random() * data.moves.length)].move["name"],
      ],
    };

    console.log(PokeData.moves);
    console.log(PokeData);
    return PokeData;
  };

  // handles pokemon submit, using value from form input

  const handlePokemonSubmit = (event) => {
    event.preventDefault();
    if (!props.input) return;

    getPokemonData(props.input)
      .then(createPokeData)
      .then((PokeData) => {
        props.setPokemon(PokeData);
        props.setErrorMessage("");
      })
      .then(playAudio)
      //.catch(console.error);
      .catch(() => {
        props.setErrorMessage("That's Not A Pokemon!");
        console.error();
      });
  };

  // handles generate pokemon, using random id value
  const handleGeneratePokemon = () => {
    const genId = Math.floor(Math.random() * 151) + 1;

    getPokemonData(genId)
      .then(createPokeData)
      .then((PokeData) => {
        props.setPokemon(PokeData);
        props.setErrorMessage("");
        PokeData.moves.forEach((move) => getMovesData(move));
      })
      .then(playAudio)
      .catch(console.error);
  };

  return (
    <section>
      <p className="alert">{props.errorMessage}</p>

      <div className="select-pokemon-form">
        <form onSubmit={handlePokemonSubmit}>
          <label htmlFor="pokemon-name">
            <input
              type="text"
              name="pokemon-name"
              id="pokemon-name"
              placeholder="Choose a pokemon"
              value={props.input}
              onChange={(event) => props.setInput(event.target.value)}
            ></input>
          </label>
          <button className="actionBtn" id="choose" type="submit">
            I Choose You!
          </button>
        </form>
        <button
          className="actionBtn"
          id="random"
          onClick={handleGeneratePokemon}
        >
          Generate Random Pokemon
        </button>
      </div>
      <div className="waiting">
        <h3>Please Select A Pokemon</h3>
        <img
          src="https://media2.giphy.com/media/JgCZ2hksM1abS/source.gif"
          alt="pokeball"
          width="100px"
        ></img>
      </div>
    </section>
  );
};

export default StartGameForm;
