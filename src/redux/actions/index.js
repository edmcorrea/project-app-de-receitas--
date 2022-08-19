import SEARCH_RECIPES from './actionTypes';

const saveSearchedRecipes = (searchedRecipes) => ({
  type: SEARCH_RECIPES,
  payload: searchedRecipes,
});

const searchRecipes = (endpoint) => async (dispatch) => {
  const request = await fetch(endpoint);
  const data = await request.json();
  dispatch(saveSearchedRecipes(data));
};

export default searchRecipes;
