import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const COPY_MESSAGE_TIMEOUT = 2000;

function RecipeDetails() {
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const { location: { pathname } } = useHistory();
  const type = pathname.includes('foods') ? 'food' : 'drink';
  const id = pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = pathname.includes('foods')
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const objKey = pathname.includes('foods') ? 'meals' : 'drinks';
      const request = await fetch(endpoint);
      const data = await request.json();
      console.log(data[objKey][0]);
      setCurrentProduct(data[objKey][0]);
    };
    fetchData();
  }, []);

  const keyString = pathname.includes('foods') ? 'Meal' : 'Drink';
  const { [`str${keyString}`]: name, strArea: nationality = '',
    strCategory: category = '', [`str${keyString}Thumb`]: image,
    strAlcoholic: alcoholicOrNot = '' } = currentProduct;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
  }, []);

  const handleShareButton = () => {
    copy(window.location.href);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), COPY_MESSAGE_TIMEOUT);
  };

  const addFavoriteRecipe = (favoriteRecipes) => {
    const currentRecipe = { id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image };
    const newFavoriteRecipes = [...favoriteRecipes, currentRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setIsFavorite(true);
  };

  const removeFavoriteRecipe = (favoriteRecipes) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setIsFavorite(false);
  };

  const handleFavoriteRecipeButton = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
      removeFavoriteRecipe(favoriteRecipes);
      return;
    }
    addFavoriteRecipe(favoriteRecipes);
  };

  return (
    <>
      { showMessage && <p className="copy-message">Link copied!</p> }
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => handleShareButton() }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavoriteRecipeButton() }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
      </button>
    </>
  );
}

export default connect()(RecipeDetails);
