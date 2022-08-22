import fetchEndPoint from '../../services/fetchFunction';
import SEARCH_RECIPES from './actionTypes';

const saveSearchedRecipes = (searchedRecipes) => ({
  type: SEARCH_RECIPES,
  payload: searchedRecipes,
});

const searchRecipes = (endpoint) => async (dispatch) => {
  dispatch(saveSearchedRecipes(await fetchEndPoint(endpoint)));
};

export default searchRecipes;
