import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipeCard({ recipe, index }) {
  return (
    <div style={ { border: '2px solid red' } }>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt={ recipe.name }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          recipe.type === 'food'
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>

      <button
        type="button"
        onClick={ () => console.log('URL!!!') }
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
