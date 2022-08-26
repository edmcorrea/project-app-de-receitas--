import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/recipeCard.css';

export default function RecipeDrinkCard(props) {
  const { recipe: { strDrinkThumb, strDrink, idDrink, strAlcoholic }, index } = props;
  return (
    <Link to={ `drinks/${idDrink}` }>
      <div
        className="card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ `Foto da receita ${strDrink}` }
        />
        <div className="cardText">
          <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
          <h4>{strAlcoholic}</h4>
        </div>
      </div>
    </Link>
  );
}

RecipeDrinkCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
