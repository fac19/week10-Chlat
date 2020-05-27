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
    .then((data) => {
      if (!data.power) data.power = 10;

      const MovesData = {
        moveName: data.name,
        type: data.damage_class.name,
        power: data.power > 30 ? data.power / 5 : data.power,
      };
      return MovesData;
    });
};

export default getMovesData;
