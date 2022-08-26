import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DrinkRecipeRecommendedCard from '../components/DrinkRecipeRecommendedCard';
import FavoriteButton from '../components/FavoriteButton';
import MealRecipeRecommendedCard from '../components/MealRecipeRecommendedCard';
import RecipeDetailDrinkCard from '../components/RecipeDetailDrinkCard';
import RecipeDetailMealCard from '../components/RecipeDetailMealCard';
import ShareButton from '../components/ShareButton';
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
  useEffect(() => {
    const fetchRecipe = async () => {
      if (path.includes('foods')) {
        const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
        const response = await fetchEndPoint(endPoint);
        setRecipe(await response.meals[0]);
      } else {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
        const response = await fetchEndPoint(endPoint);
        setRecipe((await response.drinks[0]));
      }
    };
    fetchRecipe();
  },
  []);

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

  const filterByPropertyName = (recipeEntries, name) => recipeEntries
    .filter((entrie) => entrie[0].includes(name) && (/\w+/).test(entrie[1])
     && entrie[1] !== null);

  const separetesIngredients = () => {
    const entries = Object.entries(recipe);
    setIngredients(filterByPropertyName(entries, 'Ingredient'));
    setMeasures(filterByPropertyName(entries, 'Measure'));
  };

  useEffect(() => {
    separetesIngredients();
  }, [recipe]);

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
    console.log(`Receitas em progresso${inProgressRecipes}`);
    console.log(inProgressRecipes);
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
      { recipe && (path.includes('foods') ? (
        <RecipeDetailMealCard
          recipe={ recipe }
          ingredients={ ingredients }
          measures={ measures }
        />)
        : (
          <RecipeDetailDrinkCard
            recipe={ recipe }
            ingredients={ ingredients }
            measures={ measures }
          />)
      )}
      <ShareButton path={ path.includes('foods') ? 'foods' : 'drinks' } id={ idRecipe } />
      <FavoriteButton currentProduct={ recipe } />
      {
        recomendedRecipes && (path.includes('/foods') ? <DrinkRecipeRecommendedCard
          recommendedRecipes={ getFirstSixRecipes() }
        />
          : (
            <MealRecipeRecommendedCard
              recommendedRecipes={ getFirstSixRecipes() }
            />))
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
