import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipesReducer,
});

export default rootReducer;
