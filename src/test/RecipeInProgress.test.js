import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { singleDrink, singleMeal } from './mocks/genericApiResponses';

const MOCK_FOOD_URL = '/foods/52882/in-progress';
const MOCK_DRINK_URL = '/drinks/17256/in-progress';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('A página de receita em progresso:', () => {
  it('Renderiza os elementos esperados', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn(async () => ({
      json: async () => singleMeal,
    }));

    await waitFor(() => history.push(MOCK_FOOD_URL));

    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeIngredient = screen.getByTestId('1-ingredient-step');
    const recipeInstructions = screen.getByTestId('instructions');
    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeIngredient).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(finishRecipeButton).toBeInTheDocument();
  });

  it('Salva um ingrediente checado no localStorage', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    const expectedIngredients = ['Gin 1 1/2 oz'];

    expect(localStorage.getItem('inProgressRecipes')).toBeNull();

    await waitFor(() => history.push(MOCK_DRINK_URL));

    const recipeIngredient = screen.getByTestId('0-ingredient-step');

    expect(recipeIngredient.children[0].checked).toBeFalsy();

    userEvent.click(recipeIngredient);

    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(recipeIngredient.children[0].checked).toBeTruthy();
    expect(recipesInStorage.cocktails['17256']).toEqual(expectedIngredients);
  });

  it('Remove um ingrediente do localStorage quando ele é "deschecado"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    const expectedIngredients = [];
    const savedRecipe = {
      cocktails: {
        17256: ['Gin 1 1/2 oz'],
      } };

    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));

    await waitFor(() => history.push(MOCK_DRINK_URL));

    const recipeIngredient = screen.getByTestId('0-ingredient-step');

    expect(recipeIngredient.children[0].checked).toBeTruthy();

    userEvent.click(recipeIngredient);

    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(recipeIngredient.children[0].checked).toBeFalsy();
    expect(recipesInStorage.cocktails['17256']).toEqual(expectedIngredients);
  });

  it('Remove um ingrediente do localStorage quando ele é "deschecado"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    await waitFor(() => history.push(MOCK_DRINK_URL));

    const recipeIngredient1 = screen.getByTestId('0-ingredient-step');
    const recipeIngredient2 = screen.getByTestId('1-ingredient-step');
    const recipeIngredient3 = screen.getByTestId('2-ingredient-step');
    const recipeIngredient4 = screen.getByTestId('3-ingredient-step');
    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');

    expect(finishRecipeButton.disabled).toBeTruthy();

    userEvent.click(recipeIngredient1);
    userEvent.click(recipeIngredient2);
    userEvent.click(recipeIngredient3);
    userEvent.click(recipeIngredient4);

    expect(finishRecipeButton.disabled).toBeFalsy();

    userEvent.click(finishRecipeButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/done-recipes');
  });
});
