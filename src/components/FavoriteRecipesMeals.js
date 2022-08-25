import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const arrFavoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
function FavoriteRecipesMeals() {
  return (
    <div>
      {arrFavoriteRecipes.map((favorite, index) => (
        <div key={ index }>
          {(typeFood === favorite.type || filterAll) && (
            <div key={ favorite.id }>
              <img
                src={ favorite.image }
                alt={ favorite.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {(favorite.type === 'food')
                  ? `${favorite.nationality} - ${favorite.category}`
                  : favorite.alcoholicOrNot}

              </p>
              <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
              { showMessage && <p className="copy-message">Link copied!</p> }
              <button
                type="button"
                onClick={ () => handleShareButton() }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share"
                />
              </button>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => handleFavoriteRecipeButton() }
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              >
                <img
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="Favorite"
                />
              </button>

            </div>
          )}
        </div>

      ))}
    </div>
  );
}

export default FavoriteRecipesMeals;
