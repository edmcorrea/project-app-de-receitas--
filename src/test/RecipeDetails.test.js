import { waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { singleDrink, singleMeal } from './mocks/genericApiResponses';

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
    await waitFor(() => history.push('/foods/52882'));

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
});
