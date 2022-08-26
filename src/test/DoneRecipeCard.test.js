import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import DoneRecipeCard from '../components/DoneRecipeCard';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const recipeMock = {
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta', 'Curry'],
};

const index = 0;

describe('DoneRecipeCard Component', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouterAndRedux(<DoneRecipeCard recipe={ recipeMock } index={ index } />);
    const horizontalImage = screen.getAllByTestId('0-horizontal-image');
    const horizontalTopText = screen.getAllByTestId('0-horizontal-top-text');
    const horizontalShareBtn = screen.getAllByTestId('0-horizontal-share-btn');
    const horizontalName = screen.getAllByTestId('0-horizontal-name');
    const horizontalDoneDate = screen.getAllByTestId('0-horizontal-done-date');
    const shareBtn = screen.getAllByTestId('share-btn');

    expect(horizontalImage[0]).toBeInTheDocument();
    expect(horizontalTopText[0]).toBeInTheDocument();
    expect(horizontalShareBtn[0]).toBeInTheDocument();
    expect(horizontalName[0]).toBeInTheDocument();
    expect(horizontalDoneDate[0]).toBeInTheDocument();
    expect(shareBtn[0]).toBeInTheDocument();
  });

  test('Verifica se ao ser clicado, copia a URL atual e mostra mensagem de link copiado',
    () => {
      jest.useFakeTimers();
      const COPY_MESSAGE_TIMEOUT = 2000;

      renderWithRouterAndRedux(<DoneRecipeCard recipe={ recipeMock } index={ index } />);

      const shareButton = screen.getByTestId('share-btn');
      expect(shareButton).toBeInTheDocument();
      userEvent.click(shareButton);

      const copyMessage = screen.getByText(/link copied!/i);

      expect(copyMessage).toBeInTheDocument();
      expect(copy).toHaveBeenCalled();
      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(`http://localhost/${recipeMock.type}s/${recipeMock.id}`);
      jest.advanceTimersByTime(COPY_MESSAGE_TIMEOUT);
      expect(copyMessage).not.toBeInTheDocument();
    });
});
