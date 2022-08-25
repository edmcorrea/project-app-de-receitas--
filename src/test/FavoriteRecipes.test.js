import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import FavoriteRecipes from '../pages/FavoriteRecipes';
// import SearchBar from '../components/SearchBar';
import Recipes from '../pages/Recipes';

describe('Verificação das rotas', () => {
  test('Verifica se ao modificar a rota para -/drinks- o título é modificado', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));
    renderWithRouterAndRedux(<Recipes />,
      { initialState: { header: { path: '/foods' } } });
    // const email = screen.getByTestId('email-input');
    // const senha = screen.getByTestId('password-input');
    // const botao = screen.getByRole('button', { name: /entrar/i });

    // userEvent.type(email, 'teste@teste.com');
    // userEvent.type(senha, 'abcdefg');
    // userEvent.click(botao);

    // const nameHeader = screen.queryByRole('heading', { name: /foods/i });

    // expect(nameHeader).toBeInTheDocument();

    // history.push('/drinks');
    screen.logTestingPlaygroundURL();
  });
});
