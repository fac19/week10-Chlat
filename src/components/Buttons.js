import React from "react";
import SFXSound from "./SFXSound";
import attackSound from "../sounds/attack.mp3";
import berrySound from "../sounds/berry.mp3";

function Buttons({ pokemon, randomPokemon }) {
  const [myHealthBar, setMyHealthBar] = React.useState(pokemon.hp);
  const [vsHealthBar, setVsHealthBar] = React.useState(randomPokemon.hp);
  const [pokemonName, setPokemonName] = React.useState("");
  const [pokemonAttack, setPokemonAttack] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const [sfx, setSFX] = React.useState("");

  const enemyAttack = () => {
    const vsDamage = Math.ceil(Math.random() * 10);
    setMyHealthBar(myHealthBar - vsDamage);
    setPokemonName(randomPokemon.name);
    setPokemonAttack(
      randomPokemon.move[
        Math.floor(Math.random() * randomPokemon.move.length - 1)
      ]
    );
    setTimeout(() => setDisable(false), 1500);
    setSFX(attackSound);
  };

  const handleAttackClick = () => {
    const damage = Math.ceil(Math.random() * 10);
    setVsHealthBar(vsHealthBar - damage);
    setPokemonName(pokemon.name);
    setPokemonAttack(
      pokemon.move[Math.floor(Math.random() * randomPokemon.move.length - 1)]
    );
    setDisable(true);
    setTimeout(enemyAttack, 1500);
    setSFX(attackSound);
  };

  const eatBerry = () => {
    const berry = Math.ceil(Math.random() * 15);
    setMyHealthBar(myHealthBar + berry);
    setPokemonName(pokemon.name);
    setPokemonAttack("miracle berry");
    setDisable(true);
    setTimeout(enemyAttack, 1500);
    setSFX(berrySound);

    // return <SFXSound src={berrySound} />;
  };

  return (
    <div>
      <div className="health-bars">
        {" "}
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
          {pokemonName} used{" "}
          <span style={{ color: "rgb(247, 237, 32)" }}>{pokemonAttack}</span>!
        </p>
      ) : (
        <p className="fight">It's Your Turn!</p>
      )}

      {myHealthBar <= 0 || vsHealthBar <= 0 ? (
        <h3>Game over! </h3>
      ) : (
        <div className="button-box">
          <SFXSound src={sfx} />

          <button
            className="actionBtn"
            id="attack"
            disabled={disable}
            onClick={handleAttackClick}
          >
            {/* <SFXSound src={attackSound} /> */}
            Use Attack
          </button>
          <button
            className="actionBtn"
            id="berry"
            disabled={disable}
            onClick={eatBerry}
          >
            {/* <SFXSound src={berrySound} /> */}
            Eat A Berry
          </button>
        </div>
      )}
    </div>
  );
}

export default Buttons;
