import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavoriteRecipe(fav, index) {
  const { id, type, image, name, category, nationality, alcoholicOrNot } = fav;
  return (
    <div className="card-favorite-recipe">
      <Link
        to={ `/${type}s/${id}` }
      >
        <img
          src={ image }
          alt={ name }
          className="horizontal-image"
          data-testid={ `${index}-horizontal-image` }
        />
        <div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {(type === 'food')
              ? `${nationality} - ${category}`
              : alcoholicOrNot}

          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        </div>
      </Link>
      { showMessage && <h4 className="copy-message">Link copied!</h4> }
      <section>
        <button
          type="button"
          className="btn-type-meals"
          onClick={ () => handleShareButton(type, id) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share"
          />
        </button>
        <button
          type="button"
          className="btn-type-meals"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => handleFavoriteRecipeButton(id) }
          src={ blackHeartIcon }
        >
          <img
            src={ blackHeartIcon }
            alt="Favorite"
          />
        </button>
      </section>
    </div>
  );
}

export default CardFavoriteRecipe;
