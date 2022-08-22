import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { nameHeader } from '../redux/actions';

function Profile({ history, dispatch }) {
  useEffect(() => {
    const { location: { pathname } } = history;
    dispatch(nameHeader(pathname));
  }, []);

  return (
    <>
      <Header />
      <p> Profile </p>
    </>
  );
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(Profile);
