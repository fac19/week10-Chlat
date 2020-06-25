import React from "react";

function MovesButtons(props) {
  return (
    <div className="movesBtnBox">
      <button
        className="movesBtn"
        onClick={() => {
          const move1 = props.myMoves.move1.moveName;
          const move1damage = props.myMoves.move1.power;
          props.handleAttack(move1, move1damage);
          console.log(move1);
          console.log(move1damage);
        }}
      >
        {props.myMoves.move1.moveName}
      </button>
      <button
        className="movesBtn"
        onClick={() => {
          const move2 = props.myMoves.move2.moveName;
          const move2damage = props.myMoves.move2.power;
          props.handleAttack(move2, move2damage);
          console.log(move2);
          console.log(move2damage);
        }}
      >
        {props.myMoves.move2.moveName}
      </button>
      <button
        className="movesBtn"
        onClick={() => {
          const move3 = props.myMoves.move3.moveName;
          const move3damage = props.myMoves.move3.power;
          props.handleAttack(move3, move3damage);
          console.log(move3);
          console.log(move3damage);
        }}
      >
        {props.myMoves.move3.moveName}
      </button>
    </div>
  );
}

export default MovesButtons;
