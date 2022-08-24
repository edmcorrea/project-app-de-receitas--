import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeDetailMealCard({ recipe, ingredients, measures }) {
  return (
    <div className="detailCard">
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      {ingredients && ingredients.map((ingredient, index) => (
        <h4
          key={ ingredient[1] }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]} ${measures[index][1]}`}

        </h4>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        title={ recipe.strMeal }
        width="420"
        height="315"
        src={ recipe.strYoutube }
        data-testid="video"
        className="video"
      />

    </div>
  );
}

RecipeDetailMealCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.shape).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  measures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
