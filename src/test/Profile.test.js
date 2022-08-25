import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Profile from '../pages/Profile';

describe('Profile Component', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouterAndRedux(<Profile />);
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
    const { history } = renderWithRouterAndRedux(<Profile />);
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(profileLogoutBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
