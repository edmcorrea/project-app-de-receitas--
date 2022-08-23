import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { nameHeader } from '../redux/actions';

function FavoriteRecipes(props) {
  useEffect(() => {
    const { updateCurrentPath, history } = props;
    const { location: { pathname } } = history;
    updateCurrentPath(pathname);
  }, []);

  return (
    <>
      <Header />
      <p> FavoriteRecipes </p>
    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  updateCurrentPath: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateCurrentPath: (pathName) => dispatch(nameHeader(pathName)),
});

export default connect(null, mapDispatchToProps)(FavoriteRecipes);
