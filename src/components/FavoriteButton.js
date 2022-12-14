import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.png';
import whiteHeartIcon from '../images/whiteHeartIcon.png';
import '../styles/FavoriteAndShareButtons.css';

function FavoriteButton({ currentProduct = {}, productId = undefined }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isMeal = Boolean(currentProduct.idMeal);
  const type = isMeal ? 'food' : 'drink';
  const keyString = isMeal ? 'Meal' : 'Drink';
  const id = productId ?? currentProduct[`id${keyString}`];

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
  }, [id]);

  const addFavoriteRecipe = (favoriteRecipes) => {
    const {
      [`str${keyString}`]: name,
      strArea: nationality = '',
      strCategory: category = '',
      [`str${keyString}Thumb`]: image,
      strAlcoholic: alcoholicOrNot = '',
    } = currentProduct;
    const currentRecipe = {
      id,
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
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => handleFavoriteRecipeButton() }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      className="share-and-favorite-buttons"
    >
      <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
    </button>

  );
}

FavoriteButton.propTypes = {
  currentProduct: PropTypes.shape(PropTypes.shape).isRequired,
  productId: PropTypes.string,
};

FavoriteButton.defaultProps = {
  productId: undefined,
};

export default FavoriteButton;
