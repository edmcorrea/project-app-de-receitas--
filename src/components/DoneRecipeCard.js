import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/DoneRecipeCard.css';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export default function DoneRecipeCard({ recipe, index }) {
  const objKey = recipe.type === 'foods' ? 'Meal' : 'Drink';
  const tags = recipe.strTags ? recipe.strTags.split(',') : [];
  return (
    <div className="container-done-card">
      <Link to={ `/${recipe.type}/${recipe[`id${objKey}`]}` }>
        <img
          className="horizontal-image"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe[`str${objKey}Thumb`] }
          alt={ recipe[`str${objKey}`] }
        />
      </Link>

      <div className="container-info">
        <div className="container-text-share-btn">
          <p data-testid={ `${index}-horizontal-top-text` }>
            {
              recipe.type === 'foods'
                ? `${recipe.strArea} - ${recipe.strCategory}`
                : `${recipe.strAlcoholic}`
            }
          </p>
          <ShareButton path={ `${recipe.type}` } id={ recipe[`id${objKey}`] } />
          <FavoriteButton currentProduct={ recipe } productId={ recipe[`id${objKey}`] } />
        </div>

        <Link to={ `/${recipe.type}/${recipe[`id${objKey}`]}` }>
          <p data-testid={ `${index}-horizontal-name` }>{ recipe[`str${objKey}`] }</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          Done in:
          {' '}
          { recipe.doneDate || 'oi' }
        </p>
        <div className="container-tag">
          {tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
