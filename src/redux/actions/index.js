import SEARCH_RECIPES from './actionTypes';

export const NAME_HEADER = 'NAME_HEADER';

export const nameHeader = (pathname) => ({
  type: NAME_HEADER,
  pathname,
});

const saveSearchedRecipes = (searchedRecipes) => ({
  type: SEARCH_RECIPES,
  payload: searchedRecipes,
});

export const searchRecipes = (endpoint) => async (dispatch) => {
  const request = await fetch(endpoint);
  const data = await request.json();
  dispatch(saveSearchedRecipes(data));
};
