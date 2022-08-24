import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

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
  const { history } = props;

  return (
    <>
      <Header history={ history } />
      <p> DoneRecipes </p>
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>

      {doneRecipes.map((recipe, index) => (
        <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
      ))}
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default DoneRecipes;
