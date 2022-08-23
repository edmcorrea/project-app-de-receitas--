import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <>
      <Header />
      <p> DoneRecipes </p>
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(DoneRecipes);
