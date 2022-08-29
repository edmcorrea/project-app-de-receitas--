import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

import '../styles/DoneRecipes.css';

function DoneRecipes(props) {
  const [type, setType] = useState('');
  const { history } = props;

  const filterRecipes = ({ target }) => {
    if (target.name === 'all') {
      setType('all');
      return;
    }
    const value = target.name === 'food' ? 'drinks' : 'foods';
    setType(value);
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  return (
    <div className="container-done-recipes">
      <Header history={ history } />
      <div className="container-buttons">
        <button
          onClick={ filterRecipes }
          data-testid="filter-by-all-btn"
          name="all"
          type="button"
        >
          All
        </button>
        <button
          onClick={ filterRecipes }
          data-testid="filter-by-food-btn"
          name="food"
          type="button"
        >
          Food
        </button>
        <button
          onClick={ filterRecipes }
          data-testid="filter-by-drink-btn"
          name="drink"
          type="button"
        >
          Drinks
        </button>
      </div>

      <div className="container-done-cards">
        {doneRecipes
          .filter((recipe) => recipe.type !== type)
          .map((recipe, index) => (
            <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
          ))}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default DoneRecipes;
