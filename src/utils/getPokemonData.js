const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error has occurred, status is ${response.status}`);
    throw new Error(`Pokemon couldn't be caught!`);
  }
  return response.json();
};

const getPokemonData = (input) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${input}`).then(
    checkResponse
  );
};

export default getPokemonData;

// Get Pokemon type damage data
// fetch(`https://pokeapi.co/api/v2/type/poison`)
//   .then((res) => res.json())
//   .then((data) => console.log(data.damage_relations));
