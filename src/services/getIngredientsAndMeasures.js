function getIngredientsAndMeasures(recipe) {
  const filterByPropertyName = (recipeEntries, name) => recipeEntries
    .filter((entrie) => entrie[0].includes(name) && (/\w+/).test(entrie[1])
   && entrie[1] !== null);

  const recipeEntries = Object.entries(recipe);
  const ingredients = filterByPropertyName(recipeEntries, 'Ingredient');
  const measures = filterByPropertyName(recipeEntries, 'Measure');

  return { ingredients, measures };
}

export default getIngredientsAndMeasures;
