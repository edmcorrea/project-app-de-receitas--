import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIconNew2.png';
import searchIcon from '../images/searchIconNew.png';
import SearchBar from './SearchBar';
import '../styles/header.css';

function Header() {
  const [nameHeader, setNameHeader] = useState('');
  const [showIcon, setshowIcon] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { location: { pathname } } = useHistory();

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
      setNameHeader('Favorites');
      setshowIcon(false);
    }
  }, [pathname]);

  return (
    <header className="header">
      <Link to="/profile">
        <button type="button" className="header-btn">
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>
      </Link>
      <h2 data-testid="page-title" className="header-title">{nameHeader}</h2>
      {showIcon && (
        <button
          type="button"
          className="header-btn"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
        </button>
      )}
      {(showSearchBar) && <SearchBar data-testid="search-input" /> }
    </header>
  );
}

const mapStateToProps = (store) => ({
  pathname: store.header.pathname,
});

export default connect(mapStateToProps)(Header);
