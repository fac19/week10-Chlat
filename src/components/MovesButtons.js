import React from "react";
import MovesContext from "../utils/MoveContext";

function MovesButtons(props) {
  const {
    pokemonAttack,
    setPokemonAttack,
    damage,
    setDamage,
  } = React.useContext(MovesContext);

  return (
    <div className="movesBtnBox">
      <button
        className="movesBtn"
        onClick={() => {
          setPokemonAttack(props.myMoves.move1.moveName);
          setDamage(props.myMoves.move1.power);
          props.handleAttack();
          console.log(pokemonAttack);
          console.log(damage);
        }}
      >
        {props.myMoves.move1.moveName}
      </button>
      <button
        className="movesBtn"
        onClick={() => {
          setPokemonAttack(props.myMoves.move2.moveName);
          setDamage(props.myMoves.move2.power);
          props.handleAttack();
          console.log(pokemonAttack);
          console.log(damage);
        }}
      >
        {props.myMoves.move2.moveName}
      </button>
      <button
        className="movesBtn"
        onClick={() => {
          setPokemonAttack(props.myMoves.move3.moveName);
          setDamage(props.myMoves.move3.power);
          props.handleAttack();
          console.log(pokemonAttack);
          console.log(damage);
        }}
      >
        {props.myMoves.move3.moveName}
      </button>
    </div>
  );
}

export default MovesButtons;
