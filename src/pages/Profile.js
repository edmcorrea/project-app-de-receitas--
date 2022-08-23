import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.getUserLocalStorage();
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
      <div>
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
          >
            Logout
          </button>
        </Link>
      </div>
    );
  }
}

export default Profile;
