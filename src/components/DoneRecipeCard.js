import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/DoneRecipeCard.css';
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
      <div className="container-info-general">
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            recipe.type === 'foods'
              ? `${recipe.strArea} - ${recipe.strCategory}`
              : `${recipe.strAlcoholic}`
          }
        </p>
        <Link
          to={ `/${recipe.type}/${recipe[`id${objKey}`]}` }
          className="container-text"
        >
          <h3 data-testid={ `${index}-horizontal-name` }>
            { recipe[`str${objKey}`] }
          </h3>
        </Link>

        <p data-testid={ `${index}-horizontal-done-date` }>
          Done in:
          {' '}
          { recipe.doneDate}
        </p>
        <div className="tag-and-share">
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
          <ShareButton path={ `${recipe.type}` } id={ recipe[`id${objKey}`] } />
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
