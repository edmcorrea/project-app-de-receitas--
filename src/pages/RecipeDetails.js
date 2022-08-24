import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import DrinkRecipeRecommendedCard from '../components/DrinkRecipeRecommendedCard';
import MealRecipeRecommendedCard from '../components/MealRecipeRecommendedCard';
import RecipeDetailDrinkCard from '../components/RecipeDetailDrinkCard';
import RecipeDetailMealCard from '../components/RecipeDetailMealCard';
import fetchEndPoint from '../services/fetchFunction';
import './recipeDetails.css';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendedRecipes, setRecomendedRecipes] = useState([]);
  const { params: { idRecipe }, path } = useRouteMatch();
  const sixRecipes = 6;

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

  useEffect(() => {
    console.log(path);
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

  return (
    <div>
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
      <ShareButton />
      {/* Botão de favoritar precisa receber via props o produto atual */}
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
      <button
        type="button"
        className="startRecipe"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default connect()(RecipeDetails);
