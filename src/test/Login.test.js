import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('verifica a tela de login', () => {
  test('testando a rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('verifica se login é exibida corretamente', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/senha/i)).toBeInTheDocument();
  });

  test('tentando fazer login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const validador = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'qualquercoisa.pradaerro');
    expect(validador.test(email.value)).toBeFalsy();

    const senha = screen.getByTestId('password-input');
    const botao = screen.getByRole('button', { name: /entrar/i });
    expect(botao).toHaveProperty('disabled', true);

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, 'abcdefg');
    expect(botao).toHaveProperty('disabled', false);
    userEvent.click(botao);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
    screen.logTestingPlaygroundURL();
  });
});
