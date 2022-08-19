import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeDrinkCard(props) {
  const { recipe: { strDrinkThumb, strDrink }, index } = props;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ strDrinkThumb }
        alt={ `Foto da receita ${strDrink}` }
      />
      <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
    </div>
  );
}

RecipeDrinkCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
