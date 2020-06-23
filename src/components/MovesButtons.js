import React from "react";
import getMovesData from "../utils/getMovesData";

function MovesButtons({
  pokemon,
  randomPokemon,
  pokemonAttack,
  SetPokemonAttack,
  damage,
  SetDamage,
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
  // async function getMyMoves() {
  //   let num = 1;
  //   let moveData = await Promise.all(
  //     pokemon.moves.map(async (move) => {
  //       let moveResponse = await getMovesData(move);
  //       setMyMoves({ ...myMoves, ["move" + num]: moveResponse });
  //       num++;
  //       console.log(num);
  //     })
  //   );
  //   return moveData;
  // }
  // console.log(myMoves);

  // randomPokemon.moves.map((move) =>
  //   getMovesData(move).then(createMovesData)

  // })

  //   function createMovesData(data) {
  //     if (!data.power) data.power = 10;

  //     const MovesData = {
  //       moveName: data.name,
  //       type: data.damage_class.name,
  //       power: data.power > 30 ? data.power / 5 : data.power,
  //     };
  //     return MovesData;
  //   }

  return (
    <div className="movesBtnBox">
      <button className="movesBtn">{myMoves.move1.moveName}</button>
      <button className="movesBtn">{myMoves.move2.moveName}</button>
      <button className="movesBtn">{myMoves.move3.moveName}</button>
    </div>
  );
}

export default MovesButtons;
