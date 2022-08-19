import { combineReducers } from 'redux';
import recipesReducer from './recipes';

const rootReducer = combineReducers({
  recipesReducer,
});

export default rootReducer;
