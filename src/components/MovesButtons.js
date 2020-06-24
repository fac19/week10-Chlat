import React from "react";
import getMovesData from "../utils/getMovesData";
import playSound from "../utils/playSFX";
import attackSound from "../sounds/attack.mp3";

function MovesButtons({
  pokemon,
  randomPokemon,
  setPokemonName,
  setPokemonAttack,
  setDisable,
  vsHealthBar,
  setVsHealthBar,
  enemyAttack,
}) {
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

  const [damage, setDamage] = React.useState(0);

  React.useEffect(() => {
    getMyMoves();
    getVsMoves();
  }, []);

  async function getMyMoves() {
    let num = 1;
    let moveData = await Promise.all(
      pokemon.moves.map(async (move) => {
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

  async function getVsMoves() {
    let num = 1;
    let vsmoveData = await Promise.all(
      randomPokemon.moves.map(async (move) => {
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
    setPokemonAttack(move.moveName);
    setDamage(move.power);
    setPokemonName(pokemon.name + " used ");
    setVsHealthBar(vsHealthBar - damage);
    setDisable(true);
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
