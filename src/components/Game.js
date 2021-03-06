// import music from "../sounds/Pokemon-BattleMusic.mp3";
import playAudio from "../utils/playAudio";
import React from "react";
import DisplayPokemon from "./DisplayPokemon";
import Buttons from "./Buttons";

const GamePlay = ({ pokemon, setPokemon, randomPokemon, setRandomPokemon }) => {
  // handles play again
  const handlePlayAgain = () => {
    setPokemon("");
    setRandomPokemon("");
    playAudio();
  };

  return (
    <section className="gameplay">
      <div className="display-pokemon">
        <DisplayPokemon name={pokemon.name} image={pokemon.image} />
        <DisplayPokemon name={randomPokemon.name} image={randomPokemon.image} />
      </div>
      <Buttons pokemon={pokemon} randomPokemon={randomPokemon} />
      <button className="actionBtn" id="again" onClick={handlePlayAgain}>
        Challenge Another Trainer!
      </button>
    </section>
  );
};

export default GamePlay;
