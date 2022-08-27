import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import '../styles/RecipeDetailCard.css';
import DetailCardTitle from './DetailCardTitle';

export default function RecipeDetailCard({ recipe, ingredients, measures }) {
  const { path } = useRouteMatch();
  const youtubeId = path.includes('foods') ? recipe.strYoutube.split('=')[1] : '';
  const correctURL = `https://www.youtube.com/embed/${youtubeId}`;
  return (
    <div className="detailCard">

      <DetailCardTitle recipe={ recipe } />

      <div className="recipe-text recipe-container">
        <h3>Ingredients</h3>
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <h4
            key={ `${ingredient[1]}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]} ${measures[index] ? measures[index][1] : ''}`}

          </h4>
        ))}
      </div>

      { path.includes('foods') && (
        <iframe
          title={ recipe.strMeal }
          width="420"
          height="315"
          src={ correctURL }
          data-testid="video"
          className="video"
        />
      )}

      <div className="recipe-text recipe-container">
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>
      </div>
    </div>
  );
}

RecipeDetailCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.shape).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  measures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
