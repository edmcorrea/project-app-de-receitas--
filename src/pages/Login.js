import PropTypes from 'prop-types';
import React from 'react';

function Login({ history }) {
  return (
    <button
      type="button"
      onClick={ () => history.push('/foods') }
    >
      Click
    </button>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
