import { combineReducers } from 'redux';
// import filterButtons from './filterButtons';
import header from './header';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  header,
  recipesReducer,
  // filterButtons,
});

export default rootReducer;
