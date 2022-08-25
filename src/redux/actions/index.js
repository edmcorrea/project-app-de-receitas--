import fetchEndPoint from '../../services/fetchFunction';
import { NAME_HEADER, SEARCH_RECIPES, SET_RECIPE_IN_PROGRESS } from './actionTypes';

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

export const setRecipeInProgress = (recipe, ingredients, measures) => ({
  type: SET_RECIPE_IN_PROGRESS,
  payload: { recipe, ingredients, measures },
});
