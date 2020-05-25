const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error has occurred, status is ${response.status}`);
    throw new Error(`Pokemon couldn't be caught!`);
  }
  return response.json();
};

const getMovesData = (props) => {
  return fetch(`https://pokeapi.co/api/v2/move/${props}`)
    .then(checkResponse)
    .then((res) => {
      if (!res.power) res.power = 10;

      const MovesData = {
        moveName: res.name,
        type: res.damage_class.name,
        power: res.power / 5,
        pp: res.pp,
      };
      console.log(MovesData);
    });
};

export default getMovesData;
