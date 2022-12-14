import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchRecipes } from '../redux/actions';
import '../styles/searchbar.css';

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

function SearchBar() {
  const [search, setSearch] = useState({
    text: '',
    searchType: '',
  });
  const [page, setPage] = useState('foods');

  const pathName = useSelector((state) => state.header.pathname);
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    const currentPage = pathName.includes('foods') ? 'foods' : 'drinks';
    setPage(currentPage);
  }, [pathName]);

  useEffect(() => {
    const checkReturnedRecipes = () => {
      const recipesObjKey = page === 'foods' ? 'meals' : 'drinks';
      if (recipes[recipesObjKey] === undefined) return;
      if (recipes[recipesObjKey] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      const adjustedKey = recipesObjKey[0].toUpperCase()
        .concat(recipesObjKey.slice(1, recipesObjKey.length - 1));
      const id = `id${adjustedKey}`;
      if (recipes[recipesObjKey].length === 1) {
        push(`/${page}/${recipes[recipesObjKey][0][id]}`);
      }
    };
    checkReturnedRecipes();
  }, [recipes]);

  const handleSearch = () => {
    const { text, searchType } = search;
    if (searchType === 'first-letter' && text.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const endpoint = SEARCH_ENDPOINTS[page][searchType].concat(text);
    dispatch(searchRecipes(endpoint));
  };

  return (
    <form className="searchBar">
      <div className="inputAndButton">
        <input
          type="text"
          placeholder="Type your search"
          data-testid="search-input"
          value={ search.text }
          onChange={ ({ target }) => setSearch({ ...search, text: target.value }) }
          className="inputSearch"
        />
        <button
          type="button"
          onClick={ () => handleSearch() }
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
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
    </form>
  );
}

export default SearchBar;
