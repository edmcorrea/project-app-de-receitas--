import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

import './DoneRecipeCard.css';

const copy = require('clipboard-copy');

const COPY_MESSAGE_TIMEOUT = 2000;

export default function DoneRecipeCard({ recipe, index }) {
  const [showMessage, setShowMessage] = useState(false);

  const shareButton = (recipeType, recipeId) => {
    copy(`${window.location.origin}/${recipeType}s/${recipeId}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), COPY_MESSAGE_TIMEOUT);
  };

  return (
    <div className="container">
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          className="horizontal-image"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          recipe.type === 'food'
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }
      </p>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>

      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>

      { showMessage && <p className="copy-message">Link copied!</p> }
      <button
        type="button"
        onClick={ () => shareButton(recipe.type, recipe.id) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Icone para Compartilhar"
        />
      </button>

      {recipe.tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
