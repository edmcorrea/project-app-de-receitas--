import SEARCH_RECIPES, { CHANGE_FETCH_STATUS, NAME_HEADER } from './actionTypes';

export const nameHeader = (pathname) => ({
  type: NAME_HEADER,
  pathname,
});

const saveSearchedRecipes = (searchedRecipes) => ({
  type: SEARCH_RECIPES,
  payload: searchedRecipes,
});

const changeFetchStatus = (isFetching) => ({
  type: CHANGE_FETCH_STATUS,
  payload: isFetching,
});

export const searchRecipes = (endpoint) => async (dispatch) => {
  dispatch(changeFetchStatus(true));
  const request = await fetch(endpoint);
  const data = await request.json();
  dispatch(saveSearchedRecipes(data));
  dispatch(changeFetchStatus(false));
};
