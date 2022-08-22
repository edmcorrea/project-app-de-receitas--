const fetchEndPoint = async (endpoint) => {
  const response = fetch(endpoint);
  const responseJson = (await response).json();
  return responseJson;
};

export default fetchEndPoint;
