import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import useGetRecipeForDetails from '../hooks/useGetRecipeForDetails';
import '../styles/RecipeInProgress.css';

function RecipeinProgress() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { params: { idRecipe }, path } = useRouteMatch();
  const currentPath = path.includes('foods') ? 'foods' : 'drinks';
  const objKey = path.includes('foods') ? 'Meal' : 'Drink';

  useGetRecipeForDetails(idRecipe, path, setRecipe, setIngredients, setMeasures);

  return (
    <div className="detailCard">
      <img
        src={ recipe[`str${objKey}Thumb`] }
        alt={ recipe[`str${objKey}`] }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-category">
        {
          path.includes('foods') ? recipe.strCategory : recipe.strAlcoholic
        }
      </h3>
      <ShareButton path={ currentPath } id={ recipe[`id${objKey}`] } />
      <FavoriteButton currentProduct={ recipe } />
      <h2 data-testid="recipe-title">{recipe[`str${objKey}`]}</h2>
      {ingredients && ingredients.map((ingredient, index) => (
        <label
          htmlFor={ `${ingredient[1]}` }
          key={ ingredient[1] }
          data-testid={ `${index}-ingredient-step` }
          className="ingredient"
        >
          <input id={ `${ingredient[1]}` } type="checkbox" />
          <span>{`${ingredient[1]} ${measures[index] ? measures[index][1] : ''}`}</span>
        </label>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        onClick={ () => {} }
        data-testid="finish-recipe-btn"
      >
        Finish recipe
      </button>
    </div>
  );
}

export default connect()(RecipeinProgress);
