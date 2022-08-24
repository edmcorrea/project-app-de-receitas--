import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetailDrinkCard({ recipe, ingredients, measures }) {
  return (
    <div className="detailCard">
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      {ingredients && ingredients.map((ingredient, index) => (
        <h4
          key={ ingredient[1] }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]} ${measures[index] ? measures[index][1] : ''}`}

        </h4>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
    </div>
  );
}

const shapeRecipe = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
};

RecipeDetailDrinkCard.propTypes = {
  recipe: PropTypes.shape(shapeRecipe).isRequired,
  ingredients: PropTypes.shape(PropTypes.array).isRequired,
  measures: PropTypes.shape(PropTypes.array).isRequired,
};
