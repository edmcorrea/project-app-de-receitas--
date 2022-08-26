import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página Recipes', () => {
  test(`Se é possível filtrar pela categoria e se clicar na mesma categoria
   filtrada redefine o filtro`, async () => {
    const timeToWait = 2000;

    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/drinks');

    await new Promise((r) => setTimeout(r, timeToWait));

    const buttonCategOrdinary = screen.getByRole('button', { name: /ordinary drink/i });

    userEvent.click(buttonCategOrdinary);

    await new Promise((r) => setTimeout(r, timeToWait));

    userEvent.click(buttonCategOrdinary);

    await new Promise((r) => setTimeout(r, timeToWait));

    console.log(screen.logTestingPlaygroundURL());
  });
});
