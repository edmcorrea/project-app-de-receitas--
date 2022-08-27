import { useEffect } from 'react';
import { fetchRecipeById } from '../services/fetchFunction';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';

function useGetRecipeForDetails(id, path, ...setters) {
  const [setRecipe, setIngredients, setMeasures] = setters;
  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await fetchRecipeById(id, path);
      setRecipe(recipe);
      const {
        ingredients,
        measures,
      } = getIngredientsAndMeasures(recipe);
      setMeasures(measures);
      setIngredients(ingredients);
    };
    fetchRecipe();
  }, []);
}

export default useGetRecipeForDetails;
