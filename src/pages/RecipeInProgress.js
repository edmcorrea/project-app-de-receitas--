import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DetailCardTitle from '../components/DetailCardTitle';
import useGetRecipeForDetails from '../hooks/useGetRecipeForDetails';
import '../styles/RecipeInProgress.css';

function RecipeinProgress() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const { params: { idRecipe }, path } = useRouteMatch();
  const { push } = useHistory();

  const keyForLocalStorage = path.includes('foods') ? 'meals' : 'cocktails';

  useGetRecipeForDetails(idRecipe, path, setRecipe, setIngredients, setMeasures);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const retrievedUsedIngredients = inProgressRecipes[keyForLocalStorage]
    && inProgressRecipes[keyForLocalStorage][idRecipe]
      ? inProgressRecipes[keyForLocalStorage][idRecipe] : [];
    setUsedIngredients(retrievedUsedIngredients);
  }, []);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const udpatedInProgressRecipes = { ...inProgressRecipes,
      [keyForLocalStorage]: {
        [idRecipe]: usedIngredients,
      } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(udpatedInProgressRecipes));
  }, [usedIngredients]);

  const handleClickedIngredient = (ingredientString) => {
    if (usedIngredients.includes(ingredientString)) {
      const oldIngredients = usedIngredients
        .filter((ingredient) => !ingredient.includes(ingredientString));
      setUsedIngredients(oldIngredients);
    } else {
      setUsedIngredients([...usedIngredients, ingredientString]);
    }
  };

  return (
    <div className="detailCard">

      <DetailCardTitle recipe={ recipe } />

      {ingredients.map((ingredient, index) => {
        const ingredientString = (
          `${ingredient[1]} ${measures[index] ? measures[index][1] : ''}`);
        return (
          <label
            htmlFor={ ingredientString }
            key={ `${ingredientString} ${index}` }
            data-testid={ `${index}-ingredient-step` }
            className="ingredient"
          >
            <input
              id={ ingredientString }
              type="checkbox"
              checked={ usedIngredients.includes(ingredientString) }
              onChange={ () => handleClickedIngredient(ingredientString) }
            />
            <span>{ingredientString}</span>
          </label>
        );
      })}

      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button
        type="button"
        onClick={ () => push('/done-recipes') }
        data-testid="finish-recipe-btn"
        disabled={ usedIngredients.length !== ingredients.length }
      >
        Finish recipe
      </button>
    </div>
  );
}

export default RecipeinProgress;
