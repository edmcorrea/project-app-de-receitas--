import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pathname }) {
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
        ? <SearchBar />
        : (
          <>
            <Link to="/profile">
              <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
            </Link>
            <p data-testid="page-title">{nameHeader}</p>
            {showIcon && (
              <button
                type="button"
                data-testid="search-top-btn"
                onClick={ () => setSearchBar(true) }
              >
                <img src={ searchIcon } alt="searchIcon" />
              </button>
            )}
          </>
        )}
    </div>
  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  pathname: store.header.pathname,
});

export default connect(mapStateToProps)(Header);
