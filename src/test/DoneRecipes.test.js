import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import DoneRecipes from '../pages/DoneRecipes';

describe('DoneRecipes Component', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterByFoodBtn = screen.getByTestId('filter-by-food-btn');
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(filterByAllBtn).toBeInTheDocument();
    expect(filterByFoodBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();

    userEvent.click(filterByAllBtn);
    userEvent.click(filterByFoodBtn);
    userEvent.click(filterByDrinkBtn);
  });
});
