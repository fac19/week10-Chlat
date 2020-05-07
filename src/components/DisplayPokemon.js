import React from "react";

const DisplayPokemon = (props) => {
  const { name, image, hp } = props;
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt={name}></img>
      <p>{hp}</p>
    </div>
  );
};

export default DisplayPokemon;
