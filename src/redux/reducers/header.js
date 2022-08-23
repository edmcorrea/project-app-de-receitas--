import { NAME_HEADER } from '../actions/actionTypes';

const INITIAL_STATE = {
  pathname: '',
};

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NAME_HEADER:
    return {
      ...state,
      pathname: action.pathname,
    };
  default:
    return state;
  }
};

export default header;
