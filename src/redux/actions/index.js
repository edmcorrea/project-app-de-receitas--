import SEARCH_RECIPES, { CHANGE_FETCH_STATUS } from './actionTypes';

const saveSearchedRecipes = (searchedRecipes) => ({
  type: SEARCH_RECIPES,
  payload: searchedRecipes,
});

const changeFetchStatus = (isFetching) => ({
  type: CHANGE_FETCH_STATUS,
  payload: isFetching,
});

const searchRecipes = (endpoint) => async (dispatch) => {
  dispatch(changeFetchStatus(true));
  const request = await fetch(endpoint);
  const data = await request.json();
  dispatch(saveSearchedRecipes(data));
  dispatch(changeFetchStatus(false));
};

export default searchRecipes;
