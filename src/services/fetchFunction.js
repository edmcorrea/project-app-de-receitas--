const fetchEndPoint = async (endpoint) => {
  const response = fetch(endpoint);
  const responseJson = (await response).json();
  console.log(await responseJson);
  return responseJson;
};

export default fetchEndPoint;
