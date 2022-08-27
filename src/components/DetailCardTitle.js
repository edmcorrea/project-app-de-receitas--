import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import '../styles/DetailCardTitle.css';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export default function DetailCardTitle({ recipe }) {
  const { params: { idRecipe }, path } = useRouteMatch();
  const isMealOrDrink = (path.includes('foods') ? 'Meal' : 'Drink');
  return (
    <div className="detail-title-card">
      <div className="recipe-image-container">
        <img
          src={ recipe[`str${isMealOrDrink}Thumb`] }
          alt={ recipe[`str${isMealOrDrink}`] }
          data-testid="recipe-photo"
        />
      </div>
      <div className="recipe-info-container">
        <div className="recipe-title-container">
          <h2 data-testid="recipe-title">{recipe[`str${isMealOrDrink}`]}</h2>
          <h3 data-testid="recipe-category">
            {path.includes('foods') ? recipe.strCategory : recipe.strAlcoholic}
          </h3>
        </div>
        <div className="interaction-buttons">
          <ShareButton
            path={ path.includes('foods') ? 'foods' : 'drinks' }
            id={ idRecipe }
          />
          <FavoriteButton currentProduct={ recipe } />
        </div>
      </div>
    </div>
  );
}

DetailCardTitle.propTypes = {
  recipe: PropTypes.shape(PropTypes.shape).isRequired,
};
