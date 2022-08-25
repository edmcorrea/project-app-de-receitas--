import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

afterEach(() => {
  jest.clearAllMocks();
});

describe('O botão de compartilhar', () => {
  it('Ao ser clicado, copia a URL atual e mostra mensagem de link copiado',
    () => {
      jest.useFakeTimers();
      const COPY_MESSAGE_TIMEOUT = 2000;

      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/foods/52882');

      const shareButton = screen.getByTestId('share-btn');

      expect(shareButton).toBeInTheDocument();

      userEvent.click(shareButton);

      const copyMessage = screen.getByText(/link copied!/i);

      expect(copyMessage).toBeInTheDocument();
      expect(copy).toHaveBeenCalled();
      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith('http://localhost:3000/foods/52882');
      jest.advanceTimersByTime(COPY_MESSAGE_TIMEOUT);
      expect(copyMessage).not.toBeInTheDocument();
    });
});
