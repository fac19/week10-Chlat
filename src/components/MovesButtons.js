import React from "react";
import getMovesData from "../utils/getMovesData";
import playSound from "../utils/playSFX";
import attackSound from "../sounds/attack.mp3";

function MovesButtons(props) {
  const handleAttack = (move) => {
    props.setPokemonAttack(move.moveName);
    props.setDamage(move.power);
    props.setPokemonName(props.pokemon.name + " used ");
    // props.setVsHealthBar(props.vsHealthBar - props.damage);
    props.setDisable(true);
    playSound(attackSound);
  };

  return (
    <div className="movesBtnBox">
      <button className="movesBtn" onClick={handleAttack(props.myMoves.move1)}>
        {props.myMoves.move1.moveName}
      </button>
      <button className="movesBtn" onClick={handleAttack(props.myMoves.move2)}>
        {props.myMoves.move2.moveName}
      </button>
      <button className="movesBtn" onClick={handleAttack(props.myMoves.move3)}>
        {props.myMoves.move3.moveName}
      </button>
    </div>
  );
}

export default MovesButtons;
