import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

import './DoneRecipes.css';

// doneRecipes -> Mock para preencher as informações do Componente
const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes(props) {
  const [type, setType] = useState('');
  const { history } = props;

  const filterRecipes = ({ target }) => {
    if (target.name === 'all') {
      setType('all');
      return;
    }
    const value = target.name === 'food' ? 'drink' : 'food';
    setType(value);
  };

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
            <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
          ))}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default DoneRecipes;
