import React from "react";
import "./App.css";
import getPokemonData from "./getPokemonData.js";
import DisplayPokemon from "./components/DisplayPokemon";
import Buttons from "./components/Buttons";
import music from "./sounds/Pokemon-BattleMusic.mp3";

function App() {
  // form input
  const [input, setInput] = React.useState("");
  // pokemon data
  const [pokemon, setPokemon] = React.useState("");
  const [randomPokemon, setRandomPokemon] = React.useState("");
  // error message
  const [errMessage, setErrorMessage] = React.useState("");

  // function that generates opponent's pokemon
  React.useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1;

    getPokemonData(randomId)
      .then(createPokeData)
      .then((PokeData) => setRandomPokemon(PokeData))
      .catch(console.error);
  }, [pokemon]);

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

  // handles pokemon submit, using value from form input
  const handlePokemonSubmit = (event) => {
    event.preventDefault();
    if (!input) return;

    getPokemonData(input)
      .then(createPokeData)
      .then((PokeData) => {
        setPokemon(PokeData);
        setErrorMessage("");
      })
      .then(playAudio)
      //.catch(console.error);
      .catch(() => {
        setErrorMessage("That's Not A Pokemon!");
        console.error();
      });
  };

  // handles generate pokemon, using random id value
  const handleGeneratePokemon = () => {
    const genId = Math.floor(Math.random() * 151) + 1;

    getPokemonData(genId)
      .then(createPokeData)
      .then((PokeData) => {
        setPokemon(PokeData);
        setErrorMessage("");
      })
      .then(playAudio)

      .catch(console.error);
  };

  // handles play again
  const handlePlayAgain = () => {
    setPokemon("");
    setRandomPokemon("");
    playAudio();
  };

  const playAudio = () => {
    const audio = document.querySelector("audio");

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <main>
      <h1 className="title">Let's Go Pokemon Battle!</h1>
      <audio>
        <source src={music}></source>
      </audio>
      {pokemon && randomPokemon ? (
        <section className="gameplay">
          <div className="display-pokemon">
            <DisplayPokemon name={pokemon.name} image={pokemon.image} />
            <DisplayPokemon
              name={randomPokemon.name}
              image={randomPokemon.image}
            />
          </div>
          <Buttons pokemon={pokemon} randomPokemon={randomPokemon} />
          <button className="actionBtn" id="again" onClick={handlePlayAgain}>
            Challenge Another Trainer!
          </button>
          {/* <button onClick={playAudio}>Play Audio</button> */}
        </section>
      ) : (
        <section>
          <p className="alert">{errMessage}</p>

          <div className="select-pokemon-form">
            <form onSubmit={handlePokemonSubmit}>
              <label htmlFor="pokemon-name">
                <input
                  type="text"
                  name="pokemon-name"
                  id="pokemon-name"
                  placeholder="Choose a pokemon"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
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
      )}
    </main>
  );
}

export default App;
