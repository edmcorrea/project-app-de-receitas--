import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import SearchBar from '../components/SearchBar';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { emptyResponse, meals, singleMeal } from './mocks/genericApiResponses';

afterEach(() => jest.clearAllMocks());

const textInputTestId = 'search-input';
const radioIngredientTestId = 'ingredient-search-radio';
const radioNameTestId = 'name-search-radio';
const radioLetterTestId = 'first-letter-search-radio';
const searchButtonTestId = 'exec-search-btn';
const thirdFetch = 3;

describe('A barra de buscas:', () => {
  it('Renderiza com os elementos esperados', () => {
    renderWithRouterAndRedux(<SearchBar />);

    const textInput = screen.getByTestId(textInputTestId);
    const radioIngredient = screen.getByTestId(radioIngredientTestId);
    const radioName = screen.getByTestId(radioNameTestId);
    const radioFirstLetter = screen.getByTestId(radioLetterTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    expect(textInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Faz a requisição correta quando o usuário está na página de comidas', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));

    renderWithRouterAndRedux(<SearchBar />,
      { initialState: { header: { pathname: '/foods' } } });

    const textInput = screen.getByTestId(textInputTestId);
    const radioIngredient = screen.getByTestId(radioIngredientTestId);
    const radioName = screen.getByTestId(radioNameTestId);
    const radioFirstLetter = screen.getByTestId(radioLetterTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.type(textInput, 'beef');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef');

    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=beef');

    userEvent.clear(textInput);
    userEvent.type(textInput, 'b');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(thirdFetch);
    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
  });

  it('Faz a requisição correta quando o usuário está na página de bebidas', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));

    renderWithRouterAndRedux(<SearchBar />,
      { initialState: { header: { pathname: '/drinks' } } });

    const textInput = screen.getByTestId(textInputTestId);
    const radioIngredient = screen.getByTestId(radioIngredientTestId);
    const radioName = screen.getByTestId(radioNameTestId);
    const radioFirstLetter = screen.getByTestId(radioLetterTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.type(textInput, 'water');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water');

    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=water');

    userEvent.clear(textInput);
    userEvent.type(textInput, 'w');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(thirdFetch);
    expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w');
  });

  it('Alerta se usuário tenta buscar por "first-letter"com mais de uma letra', () => {
    global.alert = jest.fn();

    renderWithRouterAndRedux(<SearchBar />);

    const textInput = screen.getByTestId(textInputTestId);
    const radioFirstLetter = screen.getByTestId(radioLetterTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);
    const expectedAlert = 'Your search must have only 1 (one) character';

    userEvent.type(textInput, 'ingredient x');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith(expectedAlert);
  });

  it('Alerta o usuário caso a busca retorne sem resultados', () => {
    window.alert = jest.fn();

    global.fetch = jest.fn(async () => ({
      json: async () => emptyResponse,
    }));

    renderWithRouterAndRedux(<SearchBar />,
      { initialState: { recipesReducer: {
        recipes: {
          ...emptyResponse,
        },
      } } });

    const textInput = screen.getByTestId(textInputTestId);
    const radioIngredient = screen.getByTestId(radioIngredientTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);
    const expectedAlert = 'Sorry, we haven\'t found any recipes for these filters.';

    userEvent.type(textInput, 'beef');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(window.alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith(expectedAlert);
  });

  it(`Redireciona o usuário para a página de detalhes caso a busca retorne
  um único resultado`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => singleMeal,
    }));

    const { history } = await waitFor(() => renderWithRouterAndRedux(<App />,
      { initialState: { recipesReducer: {
        recipes: {
          ...singleMeal,
        },
      } } }));

    history.push('/foods');

    const headerSearchBarButton = screen.getByTestId('search-top-btn');

    userEvent.click(headerSearchBarButton);

    const textInput = screen.getByTestId(textInputTestId);
    const radioIngredient = screen.getByTestId(radioIngredientTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.type(textInput, 'beef');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/foods/52882');
  });
});
