import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockDrinksRecipes from './mocks/mocksRecipes';
import mockCategoriesDrinks from './mocks/mockCategoriesDrink';

describe('Testa a página Recipes', () => {
  test('Se aparecem 12 cards de receitas do tipo Meal na rota /drinks', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockCategoriesDrinks),
    }));

    history.push('/drinks');

    console.log(screen.logTestingPlaygroundURL());
  });
});
