import React from 'react';
import PropTypes from 'prop-types';
import './recommendedMealAndDrinkCard.css';

export default function MealRecipeRecommendedCard({ recommendedRecipes }) {
  return (
    <div className="recommendedCards">
      {recommendedRecipes.map((recomendedRecipe, index) => (
        <div
          key={ recomendedRecipe.strMeal }
          data-testid={ `${index}-recomendation-card` }
        >
          <h5>{recomendedRecipe.strCategory}</h5>
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            {recomendedRecipe.strMeal}

          </h4>
          <img src={ recomendedRecipe.strMealThumb } alt={ recomendedRecipe.strMeal } />

        </div>))}
    </div>
  );
}

MealRecipeRecommendedCard.propTypes = {
  recommendedRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
