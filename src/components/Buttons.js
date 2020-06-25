import React from "react";
import getMovesData from "../utils/getMovesData";
import attackSound from "../sounds/attack.mp3";
import berrySound from "../sounds/berry.mp3";
import playSound from "../utils/playSFX";
import MovesButtons from "./MovesButtons";
// import MovesContext from "../utils/MoveContext";

function Buttons({ pokemon, randomPokemon }) {
  const [pokemonAttack, setPokemonAttack] = React.useState("");
  // const [damage, setDamage] = React.useState("");
  const [myHealthBar, setMyHealthBar] = React.useState(pokemon.hp);
  const [vsHealthBar, setVsHealthBar] = React.useState(randomPokemon.hp);
  const [pokemonName, setPokemonName] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const [berryCount, setBerryCount] = React.useState(1);
  const [showMoves, setShowMoves] = React.useState(false);
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
    getMyMoves(pokemon);
    getVsMoves(randomPokemon);
  }, [pokemon, randomPokemon]);

  function getMyMoves(pokemon) {
    let num = 1;
    let moveData = Promise.all(
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

  function getVsMoves(randomPokemon) {
    let num = 1;
    let vsmoveData = Promise.all(
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

  const eatBerry = () => {
    if (berryCount <= 3) {
      setPokemonName(pokemon.name + " used ");
      setPokemonAttack("miracle berry");
      setDisable(true);
      playSound(berrySound);
      setBerryCount(berryCount + 1);
      setMyHealthBar(myHealthBar + 20);
    } else {
      setPokemonName("Oh no! " + pokemon.name + " is ");
      setPokemonAttack(" out of berries");
    }
    setTimeout(enemyAttack, 1500);
  };

  const enemyAttack = () => {
    if (vsHealthBar <= 7) {
      setVsHealthBar(vsHealthBar + 20);
      setPokemonName(randomPokemon.name + " used ");
      setPokemonAttack("miracle berry");
      playSound(berrySound);
      setTimeout(() => setDisable(false), 1500);
    } else {
      const vsMove = Object.entries(vsMoves)[
        Math.floor(Math.random() * Object.keys(vsMoves).length)
      ];
      setMyHealthBar((prevState) => prevState - vsMove[1].power);
      setPokemonName(randomPokemon.name + " used ");
      setPokemonAttack(vsMove[1].moveName);
      setTimeout(() => setDisable(false), 1500);
      playSound(attackSound);
    }
  };

  const handleAttack = (move, damage) => {
    setPokemonName(pokemon.name + " used ");
    setVsHealthBar(vsHealthBar - damage);
    setPokemonAttack(move);
    console.log(damage);
    console.log(pokemonAttack);
    setDisable(true);
    setShowMoves(false);
    setTimeout(enemyAttack, 1500);
    playSound(attackSound);
  };

  return (
    <section>
      <audio id="action-sound"></audio>
      <div className="health-bars">
        <p data-testid="my-health">
          My Health:
          <span style={{ color: "rgb(0, 138, 4)" }}>
            {myHealthBar < 0 ? 0 : myHealthBar}
          </span>
        </p>
        <p data-testid="enemy-health">
          Enemy Health:{" "}
          <span style={{ color: "rgb(245, 15, 15)" }}>
            {vsHealthBar < 0 ? 0 : vsHealthBar}
          </span>
        </p>
      </div>

      {pokemonAttack ? (
        <p className="fight">
          {pokemonName}
          <span style={{ color: "rgb(247, 237, 32)" }}>{pokemonAttack}</span>!
        </p>
      ) : (
        <p className="fight">It's Your Turn!</p>
      )}

      {myHealthBar <= 0 || vsHealthBar <= 0 ? (
        <h3>Game over! </h3>
      ) : (
        <div className="button-box">
          {showMoves ? (
            <MovesButtons myMoves={myMoves} handleAttack={handleAttack} />
          ) : null}
          <button
            className="actionBtn"
            id="attack"
            disabled={disable}
            onClick={() => {
              setShowMoves(true);
            }}
          >
            Use Attack
          </button>
          <button
            className="actionBtn"
            id="berry"
            disabled={disable}
            onClick={eatBerry}
          >
            Eat A Berry
          </button>
        </div>
      )}
    </section>
  );
}

export default Buttons;
