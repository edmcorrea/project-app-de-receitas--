import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { searchRecipes } from '../redux/actions';

const SEARCH_ENDPOINTS = {
  foods: {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'first-letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  },
  drinks: {
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    'first-letter': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  },
};

function SearchBar({ doSearch, history, recipes, isFetching, pathname }) {
  const [search, setSearch] = useState({
    text: '',
    searchType: '',
  });
  const [page, setPage] = useState('foods');
  const [waitFetch, setWaitFetch] = useState(true);

  useEffect(() => {
    const currentPage = pathname.includes('foods') ? 'foods' : 'drinks';
    setPage(currentPage);
  });

  useEffect(() => setWaitFetch(isFetching), [isFetching]);

  useEffect(() => {
    const checkReturnedRecipes = () => {
      if (waitFetch) return;
      const recipesObjKey = page === 'foods' ? 'meals' : 'drinks';
      console.log(page);
      if (recipes[recipesObjKey] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      const adjustedKey = recipesObjKey[0].toUpperCase()
        .concat(recipesObjKey.slice(1, recipesObjKey.length - 1));
      const id = `id${adjustedKey}`;
      if (recipes[recipesObjKey].length === 1) {
        history.push(`/${page}/${recipes[recipesObjKey][0][id]}`);
      }
    };
    checkReturnedRecipes();
  }, [waitFetch]);

  const handleSearch = () => {
    const { text, searchType } = search;
    if (searchType === 'first-letter' && text.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const endpoint = SEARCH_ENDPOINTS[page][searchType].concat(text);
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
      <button
        type="button"
        onClick={ () => handleSearch() }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  doSearch: (endpoint) => dispatch(searchRecipes(endpoint)),
});

const mapStateToProps = (store) => ({
  recipes: store.recipesReducer.recipes,
  isFetching: store.recipesReducer.isFetching,
  pathname: store.header.pathname,
});

SearchBar.propTypes = {
  doSearch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  isFetching: PropTypes.func.isRequired,
  pathname: PropTypes.shape({
    includes: PropTypes.func,
  }).isRequired,
  recipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
