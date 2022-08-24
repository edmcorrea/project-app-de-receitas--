import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Header Components', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouterAndRedux(<Header />);
    const nameHeader = screen.getByTestId('page-title');
    const btnProfile = screen.getByTestId('profile-top-btn');
    const btnSearch = screen.getByTestId('search-top-btn');

    expect(nameHeader).toBeInTheDocument();
    expect(btnProfile).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });
});

describe('Click Events in Header', () => {
  test('Verifica se o botao profile funcionam corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Header />);

    const btnProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(btnProfile);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/profile');
  });

  test('Verifica se os botao do search funcionam corretamente', () => {
    renderWithRouterAndRedux(<Header />);

    const btnSearch = screen.getByTestId('search-top-btn');

    userEvent.click(btnSearch);

    const radioSearch = screen.queryByTestId('name-search-radio');

    expect(radioSearch).toBeInTheDocument();
  });
});

describe('Verificação das rotas', () => {
  test('Verifica se os títulos aparecem de acordo com as rotas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    await waitFor(() => history.push('/foods'));
    const headerFoods = screen.getByRole('heading', { name: /foods/i, level: 2 });
    expect(headerFoods).toBeInTheDocument();

    await waitFor(() => history.push('/drinks'));
    const headerDrinks = screen.getByRole('heading', { name: /drinks/i, level: 2 });
    expect(headerDrinks).toBeInTheDocument();

    await waitFor(() => history.push('/profile'));
    const headerProfile = screen.getByRole('heading', { name: /profile/i, level: 2 });
    expect(headerProfile).toBeInTheDocument();

    await waitFor(() => history.push('/done-recipes'));
    const headerDoneRecipes = screen.getByRole('heading',
      { name: /done recipes/i, level: 2 });
    expect(headerDoneRecipes).toBeInTheDocument();

    await waitFor(() => history.push('/favorite-recipes'));
    const headerFavoriteRecipes = screen.getByRole('heading',
      { name: /favorite recipes/i, level: 2 });
    expect(headerFavoriteRecipes).toBeInTheDocument();
  });
});
