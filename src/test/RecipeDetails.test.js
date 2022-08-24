import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ShareButton from '../components/ShareButton';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

afterEach(() => {
  jest.clearAllMocks();
});

describe('A página de detalhes de uma receita', () => {
  it(`Possui um botão para compartilhar a receita que, ao ser clicado,
  copia a URL atual e mostra mensagem de link copiado`,
  () => {
    jest.useFakeTimers();
    const COPY_MESSAGE_TIMEOUT = 2000;

    renderWithRouterAndRedux(<ShareButton />);

    const shareButton = screen.getByTestId('share-btn');

    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const copyMessage = screen.getByText(/link copied!/i);

    expect(copyMessage).toBeInTheDocument();
    expect(copy).toHaveBeenCalled();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('http://localhost/');
    jest.advanceTimersByTime(COPY_MESSAGE_TIMEOUT);
    expect(copyMessage).not.toBeInTheDocument();
  });
});
