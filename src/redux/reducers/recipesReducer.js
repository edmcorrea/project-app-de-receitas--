<<<<<<< HEAD
import SEARCH_RECIPES from '../actions/actionTypes';
=======
import { CHANGE_FETCH_STATUS, SEARCH_RECIPES } from '../actions/actionTypes';
>>>>>>> main-group-22

const INITIAL_STATE = {
  recipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
