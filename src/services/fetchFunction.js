const fetchEndPoint = async (endpoint) => {
  const response = fetch(endpoint);
  const responseJson = (await response).json();
  return responseJson;
};

export async function fetchRecipeById(id, path) {
  if (path.includes('foods')) {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetchEndPoint(endPoint);
    return response.meals[0];
  }
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetchEndPoint(endPoint);
  return response.drinks[0];
}

export default fetchEndPoint;
