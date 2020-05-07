import React from "react";

function Buttons({ pokemon, randomPokemon }) {
  const [myHealthBar, setMyHealthBar] = React.useState(pokemon.hp);
  const [vsHealthBar, setVsHealthBar] = React.useState(randomPokemon.hp);
  const [pokemonName, setPokemonName] = React.useState("");
  const [pokemonAttack, setPokemonAttack] = React.useState("");
  const [disable, setDisable] = React.useState(false);

  const enemyAttack = () => {
    const vsDamage = Math.ceil(Math.random() * 10);
    setMyHealthBar(myHealthBar - vsDamage);
    setPokemonName(randomPokemon.name);
    setPokemonAttack(randomPokemon.move);
    setDisable(false);
  };

  const handleAttackClick = () => {
    const damage = Math.ceil(Math.random() * 10);
    setVsHealthBar(vsHealthBar - damage);
    setPokemonName(pokemon.name);
    setPokemonAttack(pokemon.move);
    setDisable(true);
    setTimeout(enemyAttack, 1500);
  };

  const eatBerry = () => {
    const berry = Math.ceil(Math.random() * 10);
    setMyHealthBar(myHealthBar + berry);
    setPokemonName(pokemon.name);
    setPokemonAttack("miracle berry");
    setDisable(true);
    setTimeout(enemyAttack, 1500);
  };

  return (
    <div>
      <div className="health-bars">
        {" "}
        <p data-testid="my-health">
          My Health: {myHealthBar < 0 ? 0 : myHealthBar}
        </p>
        <p data-testid="enemy-health">
          Enemy Health: {vsHealthBar < 0 ? 0 : vsHealthBar}
        </p>
      </div>

      {pokemonAttack ? (
        <p>
          {pokemonName} used {pokemonAttack}!
        </p>
      ) : (
        <p>It's Your Turn!</p>
      )}

      {myHealthBar <= 0 || vsHealthBar <= 0 ? (
        <h3>Game over! </h3>
      ) : (
        <div className="actionBtns">
          <button
            className="attackBtn"
            disabled={disable}
            onClick={handleAttackClick}
          >
            Use Attack
          </button>
          <button className="berryBtn" disabled={disable} onClick={eatBerry}>
            Eat A Berry
          </button>
        </div>
      )}
    </div>
  );
}

export default Buttons;
