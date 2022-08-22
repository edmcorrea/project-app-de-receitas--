import { CHANGE_FETCH_STATUS, SEARCH_RECIPES } from '../actions/actionTypes';

const INITIAL_STATE = {
  recipes: [],
  isFetching: true,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };
  case CHANGE_FETCH_STATUS:
    return {
      ...state,
      isFetching: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
