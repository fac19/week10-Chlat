const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error has occurred, status is ${response.status}`);
    return;
  }
  return response.json();
};

const getPokemonData = (input) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    .then(checkResponse)
    .catch((err) => {
      throw new Error(`Pokemon couldn't be caught! ${err}`);
    });
};

export default getPokemonData;
