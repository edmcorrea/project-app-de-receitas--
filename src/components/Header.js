import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pathname, history }) {
  const [nameHeader, setNameHeader] = useState('');
  const [showIcon, setshowIcon] = useState(true);
  const [showSearchBar, setSearchBar] = useState(false);
  useEffect(() => {
    if (pathname === '/foods') {
      setNameHeader('Foods');
      setshowIcon(true);
    }
    if (pathname === '/drinks') {
      setNameHeader('Drinks');
      setshowIcon(true);
    }
    if (pathname === '/profile') {
      setNameHeader('Profile');
      setshowIcon(false);
    }
    if (pathname === '/done-recipes') {
      setNameHeader('Done Recipes');
      setshowIcon(false);
    }
    if (pathname === '/favorite-recipes') {
      setNameHeader('Favorite Recipes');
      setshowIcon(false);
    }
  }, [pathname]);

  return (
    <div>
      {(showSearchBar)
        ? <SearchBar history={ history } />
        : (
          <>
            <Link to="/profile">
              <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
            </Link>
            <p data-testid="page-title">{nameHeader}</p>
            {showIcon && (
              <button
                type="button"
                onClick={ () => setSearchBar(true) }
              >
                <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
              </button>
            )}
          </>
        )}
    </div>
  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (store) => ({
  pathname: store.header.pathname,
});

export default connect(mapStateToProps)(Header);
