import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoriteButton from '../components/FavoriteButton';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { singleDrink, singleMeal } from './mocks/genericApiResponses';

const MOCK_FOOD_URL = '/foods/52882';
const MOCK_DRINK_URL = '/drinks/17256';
const FAVORITE_BUTTON_TEST_ID = 'favorite-btn';
const NOT_FAVORITE_ICON = 'whiteHeartIcon.svg';
const FAVORITE_ICON = 'blackHeartIcon.svg';

afterEach(() => {
  jest.clearAllMocks();
});

describe('O botão de favoritar:', () => {
  it('É renderizado corretamente', () => {
    renderWithRouterAndRedux(<FavoriteButton productId="17256" />);

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON_TEST_ID);

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', NOT_FAVORITE_ICON);
  });

  it('Adiciona uma comida aos favoritos', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleMeal,
    }));

    localStorage.clear();

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_FOOD_URL));

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON_TEST_ID);
    expect(favoriteButton).toHaveAttribute('src', NOT_FAVORITE_ICON);

    userEvent.click(favoriteButton);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes).toHaveLength(1);
    expect(favoriteRecipes[0].id).toBe('52882');
    expect(favoriteButton).toHaveAttribute('src', FAVORITE_ICON);
  });

  it('Adiciona uma bebida aos favoritos', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    localStorage.clear();

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_DRINK_URL));

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON_TEST_ID);
    expect(favoriteButton).toHaveAttribute('src', NOT_FAVORITE_ICON);

    userEvent.click(favoriteButton);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes).toHaveLength(1);
    expect(favoriteRecipes[0].id).toBe('17256');
    expect(favoriteButton).toHaveAttribute('src', FAVORITE_ICON);
  });

  it('Remove uma bebida dos favoritos', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleMeal,
    }));

    localStorage.clear();

    const newFavoriteRecipe = [{ id: '52882' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_FOOD_URL));

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON_TEST_ID);
    expect(favoriteButton).toHaveAttribute('src', FAVORITE_ICON);

    userEvent.click(favoriteButton);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(0);
    expect(favoriteButton).toHaveAttribute('src', NOT_FAVORITE_ICON);
  });

  it('Remove uma bebida dos favoritos', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleDrink,
    }));

    localStorage.clear();

    const newFavoriteRecipe = [{ id: '17256' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));

    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(MOCK_DRINK_URL));

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON_TEST_ID);
    expect(favoriteButton).toHaveAttribute('src', FAVORITE_ICON);

    userEvent.click(favoriteButton);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(0);
    expect(favoriteButton).toHaveAttribute('src', NOT_FAVORITE_ICON);
  });
});
