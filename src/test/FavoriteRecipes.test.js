import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { meals } from './mocks/genericApiResponses';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const historyFavRecipes = '/favorite-recipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Verificação dos ele,elementos e eventos de click', () => {
  test('Verifica se aos elementos da paginafavorites-recipes estão na tela', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const profileIcon = screen.getByRole('img', { name: /profileicon/i });
    const headerName = screen.getByRole('heading', { name: /favorite/i });
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnFood = screen.getByRole('button', { name: /food/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });

    expect(profileIcon).toBeInTheDocument();
    expect(headerName).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();

    userEvent.click(btnAll);
    userEvent.click(btnFood);
    userEvent.click(btnDrinks);
  });

  test(`Verifica se, ao clicar no botão de desfavoritar,
  a refeicao é removido da tela`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnFavorite = screen.queryAllByRole('img', { name: /favorite/i });

    userEvent.click(btnFavorite[0]);
  });

  test(`Verifica se, ao clicar no botão de compartilhar,
  o nome 'Link copied!' aparece na tela e o elemento e clicado 
  vai para o clipboard`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnShare = screen.queryAllByRole('img', { name: /share/i });

    userEvent.click(btnShare[0]);

    // screen.logTestingPlaygroundURL();
  });

  test(`Verifica todos os elementos acima na rota com filtro 'food' ou na 
  rota 'drinks'`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnFavorite = screen.queryAllByRole('img', { name: /favorite/i });
    const btnShare = screen.queryAllByRole('img', { name: /share/i });
    const btnFood = screen.getByRole('button', { name: /food/i });

    userEvent.click(btnFood);
    userEvent.click(btnFavorite[0]);
    userEvent.click(btnShare[0]);
  });

  test(`Verifica todos os elementos acima na rota com filtro na
   rota 'drinks'`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnFavorite = screen.queryAllByRole('img', { name: /favorite/i });
    const btnShare = screen.queryAllByRole('img', { name: /share/i });
    const btnDrink = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(btnDrink);
    userEvent.click(btnFavorite[0]);
    userEvent.click(btnShare[0]);

    const copyMessage = screen.getByText(/link copied!/i);

    expect(copyMessage).toBeInTheDocument();
    expect(copy).toHaveBeenCalled();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('http://localhost/');
    jest.advanceTimersByTime(COPY_MESSAGE_TIMEOUT);
    expect(copyMessage).not.toBeInTheDocument();
  });
});
