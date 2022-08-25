import PropTypes from 'prop-types';
import React from 'react';
import './recommendedMealAndDrinkCard.css';

export default function DrinkRecipeRecommendedCard({ recommendedRecipes }) {
  return (
    <div className="recommendedCards">
      {recommendedRecipes.map((recomendedRecipe, index) => (
        <div
          key={ recomendedRecipe.strDrink }
          data-testid={ `${index}-recomendation-card` }
          className="recommendedCard"
        >
          <h5>{recomendedRecipe.strAlcoholic}</h5>
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            {recomendedRecipe.strDrink}

          </h4>
          <img src={ recomendedRecipe.strDrinkThumb } alt={ recomendedRecipe.strDrink } />

        </div>))}
    </div>
  );
}

DrinkRecipeRecommendedCard.propTypes = {
  recommendedRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
