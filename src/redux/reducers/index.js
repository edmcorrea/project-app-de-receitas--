import { combineReducers } from 'redux';
import header from './header';

import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  header,
  recipesReducer,
});

export default rootReducer;
