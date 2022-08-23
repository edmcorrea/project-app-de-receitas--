import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import fetchEndPoint from '../services/fetchFunction';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const { params: { idRecipe }, path } = useRouteMatch();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (path.includes('foods')) {
        const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
        const response = await fetchEndPoint(endPoint);
        setRecipe(await response.meals);
      } else {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
        const response = await fetchEndPoint(endPoint);
        setRecipe((await response.drinks));
      }
    };
    fetchRecipe();
  },
  []);

  return (
    <>
      <p> RecipeDetails </p>
      <p> pra o lint n reclamar </p>
    </>
  );
}

export default connect()(RecipeDetails);
