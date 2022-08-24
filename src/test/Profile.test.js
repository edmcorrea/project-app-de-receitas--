import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

// verificar se o email em loclaStorage esta sendo renderizado
// Verificar se os elementos estão sendo renderizados
// Verificar se os redireecionamentos estão acontecendo para as rotas corretas

describe('Profile Component', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    const profileEmailEl = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmailEl).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão "Logout" é redirecinado para rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(profileLogoutBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('O componente acessa corretamente a chave "user" no localStorage', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginUsernameInput = screen.getByTestId('email-input');
    const loginPasswordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(loginUsernameInput, 'teste@teste.com');
    userEvent.type(loginPasswordInput, '123456');
    userEvent.click(loginButton);

    history.push('/profile');

    const profileEmailEl = screen.getByRole('heading',
      { description: /teste@teste.com/i, level: 1 });
    expect(profileEmailEl).toBeInTheDocument();
  });
});
