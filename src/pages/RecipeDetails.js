import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import RecipeDetailDrinkCard from '../components/RecipeDetailDrinkCard';
import RecipeDetailMealCard from '../components/RecipeDetailMealCard';
import fetchEndPoint from '../services/fetchFunction';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { params: { idRecipe }, path } = useRouteMatch();

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
    </div>
  );
}

export default connect()(RecipeDetails);
