import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import '../styles/recommendedMealAndDrinkCard.css';

export default function RecipeRecommendedCard({ recommendedRecipes }) {
  const { path } = useRouteMatch();

  const isMealOrDrink = () => (path.includes('foods') ? 'Drink' : 'Meal');

  return (
    <div className="recommendedCards">
      {recommendedRecipes.map((recomendedRecipe, index) => (
        <div
          key={ recomendedRecipe[`str${isMealOrDrink()}`] }
          data-testid={ `${index}-recomendation-card` }
        >
          <h5>
            {path.includes('foods')
              ? recomendedRecipe.strCategory : recomendedRecipe.strAlcoholic }
          </h5>
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            {recomendedRecipe[`str${isMealOrDrink()}`]}

          </h4>
          <img
            src={ recomendedRecipe[`str${isMealOrDrink()}Thumb`] }
            alt={ recomendedRecipe[`str${isMealOrDrink()}`] }
          />

        </div>))}
    </div>
  );
}

RecipeRecommendedCard.propTypes = {
  recommendedRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
