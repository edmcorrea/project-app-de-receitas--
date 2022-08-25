import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { singleDrink, singleMeal } from './mocks/genericApiResponses';

const MOCK_FOOD_URL = '/foods/52882';

afterEach(() => {
  jest.clearAllMocks();
});

describe('A página de detalhes de uma receita', () => {
  it(`Faz uma requisição para os endpoints corretos quando o caminho
   é /foods`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleMeal,
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_FOOD_URL));

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52882');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it(`Faz uma requisição para os endpoints corretos quando o caminho
  é /drinks`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push('/drinks/17256'));

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17256');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it('Permite continuar um drink já iniciado', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    const startedRecipe = { cocktails: { 17256: ['água'] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipe));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push('/drinks/17256'));

    const continueRecipeButton = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeButton).toHaveTextContent(/continue recipe/i);

    userEvent.click(continueRecipeButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks/17256/in-progress');

    localStorage.clear();
  });

  it('Permite continuar uma comida já iniciada', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    const startedRecipe = { meals: { 52882: ['água'] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipe));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_FOOD_URL));

    const continueRecipeButton = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeButton).toHaveTextContent(/continue recipe/i);

    userEvent.click(continueRecipeButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/52882/in-progress');

    localStorage.clear();
  });

  it('O botão para iniciar não é renderizado em uma receita concluída', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleMeal,
    }));

    const finishedRecipe = [{ id: '52882' }];
    localStorage.setItem('doneRecipes', JSON.stringify(finishedRecipe));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_FOOD_URL));

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    localStorage.clear();
  });
});
