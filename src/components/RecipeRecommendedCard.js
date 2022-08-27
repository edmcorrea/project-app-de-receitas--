import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import '../styles/recommendedCards.css';

export default function RecipeRecommendedCard({ recommendedRecipes }) {
  const { path } = useRouteMatch();

  const isMealOrDrink = () => (path.includes('foods') ? 'Drink' : 'Meal');

  return (
    <div className="recommendedCards">
      <h3 className="acompanhamentos">Acompanhamentos</h3>
      <div className="recommendedCardsContent">
        {recommendedRecipes.map((recomendedRecipe, index) => (
          <div
            key={ recomendedRecipe[`str${isMealOrDrink()}`] }
            data-testid={ `${index}-recomendation-card` }
            className="recommendedCard"
          >
            <img
              src={ recomendedRecipe[`str${isMealOrDrink()}Thumb`] }
              alt={ recomendedRecipe[`str${isMealOrDrink()}`] }
            />
            <h4
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendedRecipe[`str${isMealOrDrink()}`]}

            </h4>
            <h5>
              {path.includes('foods')
                ? recomendedRecipe.strCategory : recomendedRecipe.strAlcoholic }
            </h5>

          </div>))}
      </div>
    </div>
  );
}

RecipeRecommendedCard.propTypes = {
  recommendedRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
