import { NAME_HEADER } from '../actions';

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
