import React from "react";
import MovesContext from "../utils/MoveContext";

// import getMovesData from "../utils/getMovesData";
// import playSound from "../utils/playSFX";
// import attackSound from "../sounds/attack.mp3";

function MovesButtons(props) {
  // console.log(props.myMoves.move1);
  // console.log(props.myMoves.move1.power);
  const { attack, damage } = React.useContext(MovesContext);
  const [chooseMove, setChooseMove] = attack;
  const [moveDamage, setMoveDamage] = damage;
  console.log(chooseMove);
  console.log(moveDamage);
  return (
    <div className="movesBtnBox">
      <button
        className="movesBtn"
        onClick={() => {
          setChooseMove(props.myMoves.move1.moveName);
          setMoveDamage(props.myMoves.move1.power);
          props.handleAttack();
        }}
      >
        {props.myMoves.move1.moveName}
      </button>
      <button
        className="movesBtn"
        onClick={() => {
          setChooseMove(props.myMoves.move2.moveName);
          setMoveDamage(props.myMoves.move2.power);
          props.handleAttack();
        }}
      >
        {props.myMoves.move2.moveName}
      </button>
      <button
        className="movesBtn"
        onClick={() => {
          setChooseMove(props.myMoves.move3.moveName);
          setMoveDamage(props.myMoves.move3.power);
          props.handleAttack();
        }}
      >
        {props.myMoves.move3.moveName}
      </button>
    </div>
  );
}

export default MovesButtons;
