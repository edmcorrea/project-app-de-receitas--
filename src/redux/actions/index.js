<<<<<<< HEAD
import SEARCH_RECIPES from './actionTypes';
=======
import fetchEndPoint from '../../services/fetchFunction';
import { CHANGE_FETCH_STATUS, SEARCH_RECIPES } from './actionTypes';
>>>>>>> main-group-22

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
<<<<<<< HEAD
  const request = await fetch(endpoint);
  const data = await request.json();
  dispatch(saveSearchedRecipes(data));
=======
  dispatch(changeFetchStatus(true));
  dispatch(saveSearchedRecipes(await fetchEndPoint(endpoint)));
  dispatch(changeFetchStatus(false));
>>>>>>> main-group-22
};
