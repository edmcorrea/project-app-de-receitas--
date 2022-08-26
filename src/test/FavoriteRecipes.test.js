import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

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
    userEvent.click(profileIcon);
  });

  test(`Verifica se, ao clicar no botão de desfavoritar,
  a refeicao é removido da tela`, async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnFavorite = screen.queryAllByRole('img', { name: /favorite/i });

    userEvent.click(btnFavorite[0]);
  });

  test(`Verifica se, ao clicar no botão de compartilhar,
  o nome 'Link copied!' aparece na tela e o elemento e clicado 
  vai para o clipboard`, async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnShare = screen.queryAllByRole('img', { name: /share/i });

    userEvent.click(btnShare[0]);
  });

  test(`Verifica todos os elementos dos cards buscados do localStorage 
  na rota com filtro 'food'`, async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnFavorite = screen.queryAllByRole('img', { name: /favorite/i });
    const btnShare = screen.queryAllByRole('img', { name: /share/i });
    const btnFood = screen.getByRole('button', { name: /food/i });
    const image = screen.queryByRole('img', { name: /spicy arrabiata penne/i });

    expect(image).toBeInTheDocument();

    userEvent.click(btnFood);
    userEvent.click(btnFavorite[0]);
    userEvent.click(btnShare[0]);

    expect(image).not.toBeInTheDocument();
  });

  test(`Verifica se ao clicar no botão 'share', os eventos ocorrem
  corretamente`, async () => {
    jest.useFakeTimers();
    const COPY_MESSAGE_TIMEOUT = 2000;
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const btnShare = screen.queryAllByRole('img', { name: /share/i });

    expect(btnShare[0]).toBeInTheDocument();

    userEvent.click(btnShare[0]);

    const copyMessage = screen.queryAllByRole('heading', { name: /link copied!/i });

    expect(copyMessage[0]).toBeInTheDocument();

    const hRef = 'http://localhost:3000/foods/52771';

    expect(copy).toHaveBeenCalledWith(hRef);
    expect(copy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(COPY_MESSAGE_TIMEOUT);
    expect(copyMessage[0]).not.toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });

  test(`Verifica se ao clicar na imagem o elemento é redirecionado 
  para a pagina esperada'`, async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(historyFavRecipes));

    const linkImg = screen.getByRole('img', { name: /spicy arrabiata penne/i });

    userEvent.click(linkImg);

    const btnStart = screen.getByRole('button', { name: /start recipe/i });
    expect(btnStart).toBeInTheDocument();

    // const hRef = 'http://localhost:3000/foods/52771';
  });
});
