import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { renderWithRouter } from './helpers/renderWith';

describe('Footer Component', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId('footer');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const foodsBtn = screen.getByTestId('food-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(foodsBtn).toBeInTheDocument();
  });
});
