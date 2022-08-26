import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/recipeCard.css';

export default function RecipeDrinkCard(props) {
  const { recipe: { strDrinkThumb, strDrink, idDrink }, index } = props;
  const { push } = useHistory();
  const redirectToPageDetails = () => {
    push(`drinks/${idDrink}`);
  };
  return (
    <button type="button" onClick={ redirectToPageDetails }>
      <div
        className="card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ `Foto da receita ${strDrink}` }
        />
        <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
      </div>
    </button>
  );
}

RecipeDrinkCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
