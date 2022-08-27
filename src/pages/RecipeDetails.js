import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import RecipeDetailCard from '../components/RecipeDetailCard';
import RecipeRecommendedCard from '../components/RecipeRecommendedCard';
import useGetRecipeForDetails from '../hooks/useGetRecipeForDetails';
import fetchEndPoint from '../services/fetchFunction';
import '../styles/recipeDetails.css';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendedRecipes, setRecomendedRecipes] = useState([]);
  const [isThisRecipeDone, setIsThisRecipeDone] = useState(false);
  const [isThisRecipeStarted, setIsThisRecipeStarted] = useState(false);
  const { params: { idRecipe }, path } = useRouteMatch();
  const { push: pushHistory } = useHistory();
  const sixRecipes = 6;

  const currentPath = () => {
    if (path.includes('foods')) return 'meals';
    return 'cocktails';
  };

  // Busca a receita usando o id no path
  useGetRecipeForDetails(idRecipe, path, setRecipe, setIngredients, setMeasures);

  // Busca as receitas usando endpoints fixos para usar nas recomendações
  useEffect(() => {
    const getMealsRecipes = async () => {
      const recipes = await fetchEndPoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecomendedRecipes(await recipes.meals);
    };
    const getDrinksRecipes = async () => {
      const recipes = await fetchEndPoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecomendedRecipes(await recipes.drinks);
    };
    if (path.includes('foods')) {
      getDrinksRecipes();
    } else {
      getMealsRecipes();
    }
  }, []);

  const getFirstSixRecipes = () => (
    recomendedRecipes.filter((_recomendedRecipe, index) => (
      index < sixRecipes)));

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.forEach((doneRecipe) => {
        if (doneRecipe.id === idRecipe) setIsThisRecipeDone(true);
      });
    }
  }, []);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (inProgressRecipes[currentPath()]
      && Object.keys(inProgressRecipes[currentPath()]).includes(idRecipe)) {
      setIsThisRecipeStarted(true);
    }
  }, []);

  const redirectToInProgress = () => {
    const url = currentPath() === 'meals' ? 'foods' : 'drinks';
    pushHistory(`/${url}/${idRecipe}/in-progress`);
  };

  return (
    <div className="recipeDetails">
      { ingredients.length && (
        <RecipeDetailCard
          recipe={ recipe }
          ingredients={ ingredients }
          measures={ measures }
        />
      )}
      {
        recomendedRecipes && (
          <RecipeRecommendedCard
            recommendedRecipes={ getFirstSixRecipes() }
          />)
      }
      { !isThisRecipeDone && (
        <button
          type="button"
          className="startRecipe"
          onClick={ redirectToInProgress }
          data-testid="start-recipe-btn"
        >
          { isThisRecipeStarted ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}

    </div>
  );
}

export default connect()(RecipeDetails);
