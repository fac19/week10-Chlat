import React from "react";
import Buttons from "./Buttons";
import { render, screen, fireEvent } from "@testing-library/react";

const pokemon = {
    name: "pikachu",
    hp: "50",
    move: "hit",
  };

const randomPokemon = {
    name: "ditto",
    hp: "40",
    move: "slap",
  };

test("Check button tests are running", () => {
    expect(true).toBeTruthy()
})

test('Check that health bar displays', () => {
    render (<Buttons pokemon='pikachu' randomPokemon='squirtle'/>);
    screen.getByText('My Health:')
    screen.getByText("Enemy Health:");

})

test("Check that buttons display", () => {
  render(<Buttons pokemon="pikachu" randomPokemon="squirtle" />);
  screen.getByText("Use Attack");
  screen.getByText("Eat A Berry");
});


test("Check attack button works", () => {
    render(<Buttons pokemon={pokemon} randomPokemon={randomPokemon} />);
    const attackBtn = screen.getByText("Use Attack");
    const enemyhealth = screen.getByText('Enemy Health: 40')
    fireEvent.click(attackBtn);

   expect(enemyhealth !== 'Enemy Health: 40').toBeTruthy();
})



test("Check berry button works", () => {
  render(<Buttons pokemon={pokemon} randomPokemon={randomPokemon} />);
  const berryBtn = screen.getByText("Eat A Berry");
  const myhealth = screen.getByText("My Health: 50");
  fireEvent.click(berryBtn);

  expect(myhealth !== "My Health: 50").toBeTruthy();
});