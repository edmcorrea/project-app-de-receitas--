import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWith';
import Profile from '../pages/Profile';

// verificar se o email em loclaStorage esta sendo renderizado
// Verificar se os elementos estão sendo renderizados
// Verificar se os redireecionamentos estão acontecendo para as rotas corretas

describe('Profile Component', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouter(<Profile />);
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
    const { history } = renderWithRouter(<Profile />);
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(profileLogoutBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
