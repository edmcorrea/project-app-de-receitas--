import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <>
      <Header />
      <p> Profile </p>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(Profile);
