import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import searchRecipes from '../redux/actions';

const SEARCH_ENDPOINTS = {
  ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  'first-letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
};

function SearchBar({ doSearch }) {
  const [search, setSearch] = useState({
    text: '',
    searchType: '',
  });

  const handleSearch = () => {
    const { text, searchType } = search;
    if (searchType === 'first-letter' && text.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const endpoint = SEARCH_ENDPOINTS[searchType].concat(text);
    doSearch(endpoint);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search recipe"
        data-testid="search-input"
        value={ search.text }
        onChange={ ({ target }) => setSearch({ ...search, text: target.value }) }
      />
      <div className="radio-inputs">
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="search-radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            value="ingredient"
            onChange={ ({ target }) => setSearch({ ...search,
              searchType: target.value }) }
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            value="name"
            onChange={ ({ target }) => setSearch({ ...search,
              searchType: target.value }) }
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="search-radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            value="first-letter"
            onChange={ ({ target }) => setSearch({ ...search,
              searchType: target.value }) }
          />
          First letter
        </label>
      </div>
      <button type="button" onClick={ () => handleSearch() }>
        Search
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  doSearch: (endpoint) => dispatch(searchRecipes(endpoint)),
});

SearchBar.propTypes = {
  doSearch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);
