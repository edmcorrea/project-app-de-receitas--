import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeMealCard(props) {
  const { recipe: { strMealThumb, strMeal }, index } = props;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb }
        alt={ `Foto da receita ${strMeal}` }
      />
      <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
    </div>
  );
}

RecipeMealCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
