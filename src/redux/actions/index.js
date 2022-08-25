import fetchEndPoint from '../../services/fetchFunction';
import { NAME_HEADER, SEARCH_RECIPES } from './actionTypes';

export const nameHeader = (pathname) => ({
  type: NAME_HEADER,
  pathname,
});

const saveSearchedRecipes = (searchedRecipes) => ({
  type: SEARCH_RECIPES,
  payload: searchedRecipes,
});

export const searchRecipes = (endpoint) => async (dispatch) => {
  dispatch(saveSearchedRecipes(await fetchEndPoint(endpoint)));
};
