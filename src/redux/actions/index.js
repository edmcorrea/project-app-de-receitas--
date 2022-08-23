import fetchEndPoint from '../../services/fetchFunction';
import { CHANGE_FETCH_STATUS, NAME_HEADER, SEARCH_RECIPES } from './actionTypes';

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
  dispatch(saveSearchedRecipes(await fetchEndPoint(endpoint)));
  dispatch(changeFetchStatus(false));
};
