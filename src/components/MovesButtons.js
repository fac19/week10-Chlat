import React from "react";
import getMovesData from "../utils/getMovesData";
import playSound from "../utils/playSFX";
import attackSound from "../sounds/attack.mp3";

function MovesButtons(props) {
  const [myMoves, setMyMoves] = React.useState({
    move1: "",
    move2: "",
    move3: "",
  });
  const [vsMoves, setVsMoves] = React.useState({
    move1: "",
    move2: "",
    move3: "",
  });

  React.useEffect(() => {
    getMyMoves(props);
    getVsMoves(props);
  }, [vsMoves]);

  async function getMyMoves(props) {
    let num = 1;
    let moveData = await Promise.all(
      props.pokemon.moves.map(async (move) => {
        let moveResponse = await getMovesData(move);
        setMyMoves((prevState) => ({
          ...prevState,
          ["move" + num]: moveResponse,
        }));
        num++;
      })
    );
    return moveData;
  }

  async function getVsMoves(props) {
    let num = 1;
    let vsmoveData = await Promise.all(
      props.randomPokemon.moves.map(async (move) => {
        let moveResponse = await getMovesData(move);
        setVsMoves((prevState) => ({
          ...prevState,
          ["move" + num]: moveResponse,
        }));
        num++;
      })
    );
    return vsmoveData;
  }

  console.log(vsMoves);
  console.log(myMoves.move1);
  console.log(myMoves.move1.power);

  const handleAttack = (move) => {
    props.setPokemonAttack(move.moveName);
    props.setDamage(move.power);
    props.setPokemonName(props.pokemon.name + " used ");
    props.setVsHealthBar(props.vsHealthBar - props.damage);
    props.setDisable(true);
    // setTimeout(enemyAttack, 1500);
    playSound(attackSound);
  };

  return (
    <div className="movesBtnBox">
      <button className="movesBtn" onClick={handleAttack(myMoves.move1)}>
        {myMoves.move1.moveName}
      </button>
      <button className="movesBtn" onClick={handleAttack(myMoves.move2)}>
        {myMoves.move2.moveName}
      </button>
      <button className="movesBtn" onClick={handleAttack(myMoves.move3)}>
        {myMoves.move3.moveName}
      </button>
    </div>
  );
}

export default MovesButtons;
