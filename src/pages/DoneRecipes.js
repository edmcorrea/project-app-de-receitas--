import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { nameHeader } from '../redux/actions';

function DoneRecipes({ history, dispatch }) {
  useEffect(() => {
    const { location: { pathname } } = history;
    dispatch(nameHeader(pathname));
  }, []);

  return (
    <>
      <Header />
      <p> DoneRecipes </p>
    </>
  );
}

DoneRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(DoneRecipes);
