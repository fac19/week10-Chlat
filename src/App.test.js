import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test("Check button tests are running", () => {
  expect(true).toBeTruthy();
});

test('Check home page renders correctly', () => {
  render(<App/>)
  screen.getByText(`Let's Go Pokemon Battle!`)
  screen.getByText(`I Choose You!`);
  screen.getByText(`Generate Random Pokemon`);

})

test("Check input generates correct pokemon", () => {
  render(<App/>)
  const inputNode = screen.getByPlaceholderText("Choose a pokemon")
  inputNode.textContent = "pikachu";
  const chooseButton = screen.getByText("I Choose You!")
  fireEvent.click(chooseButton);
  screen.getByText("pikachu")
})

test('If input is empty, placeholder is shown', () => {
  render(<App />);
   const inputNode = screen.getByPlaceholderText("Choose a pokemon");
   inputNode.textContent = ''
   screen.getByText("Please Select A Pokemon");
   screen.getByAltText("pokeball");
})