import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import App from '../App';

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
  // beforeEach(() => {

  // });

  test('Verifica se ao modificar a rota para -/drinks- o título é modificado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const botao = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, 'abcdefg');
    userEvent.click(botao);

    const nameHeader = screen.queryByRole('heading', { name: /foods/i });

    expect(nameHeader).toBeInTheDocument();

    history.push('/drinks'); // não funciona
    // screen.logTestingPlaygroundURL();
  });
  // test('Verifica se ao modificar a rota para -/drinks- o título é modificado', () => {
  //   history.push('/drinks');
  //   const nameHeader = screen.queryByRole('heading', {
  //     name: /foods/i });

  //   expect(nameHeader).toBeInTheDocument();
  // });
});
