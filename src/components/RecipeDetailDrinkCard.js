import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetailDrinkCard({ recipe, ingredients, measures }) {
  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
      {ingredients && ingredients.map((ingredient, index) => (
        <h4
          key={ ingredient[1] }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]} ${measures[index][1]}`}

        </h4>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <div data-testid={ `${0}-recomendation-card` } />
    </div>
  );
}

RecipeDetailDrinkCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.array).isRequired,
  measures: PropTypes.arrayOf(PropTypes.array).isRequired,
};
