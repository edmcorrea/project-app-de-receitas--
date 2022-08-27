import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { nameHeader } from '../redux/actions';
import '../styles/Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const { updateCurrentPath } = this.props;
    this.getUserLocalStorage();
    updateCurrentPath(window.location.pathname);
  }

  getUserLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ user });
  }

  clearLocalStorage = () => {
    localStorage.clear();
  }

  render() {
    const { user } = this.state;
    return (
      <div className="profile-page">
        <Header />
        <div className="profile-main">
          <h1 data-testid="profile-email">{ user ? user.email : '' }</h1>
          <Link to="/done-recipes">
            <button data-testid="profile-done-btn" type="button">
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button data-testid="profile-favorite-btn" type="button">
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ this.clearLocalStorage }
              className="logout-btn"
            >
              Logout
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  // history: PropTypes.shape(PropTypes.shape).isRequired,
  updateCurrentPath: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateCurrentPath: (pathName) => dispatch(nameHeader(pathName)),
});

export default connect(null, mapDispatchToProps)(Profile);
