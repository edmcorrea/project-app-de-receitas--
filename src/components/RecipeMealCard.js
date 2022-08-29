import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/recipeCard.css';

export default function RecipeMealCard(props) {
  const { recipe: { strMealThumb, strMeal, idMeal, strCategory },
    currentFilter, index } = props;

  return (
    <Link to={ `foods/${idMeal}` }>
      <div
        className="card"
        data-testid={ `${index}-recipe-card` }

      >
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ `Foto da receita ${strMeal}` }
        />
        <div className="cardText">
          <h3
            data-testid={ `${index}-card-name` }
          >
            {strMeal}

          </h3>
          <h4>{currentFilter === 'All' ? strCategory : currentFilter}</h4>
        </div>
      </div>
    </Link>
  );
}

RecipeMealCard.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.shape({})).isRequired,
};
