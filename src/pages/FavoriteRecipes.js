import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import { nameHeader } from '../redux/actions';
import './favoriteRecipes.css';

const copy = require('clipboard-copy');

const COPY_MESSAGE_TIMEOUT = 2000;

// const arrFavoriteRecipes = [
//   {
//     id: '52771',
//     type: 'food',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//   },
// ];

function FavoriteRecipes(props) {
  const [filterAll, setFilterAll] = useState(true);
  const [typeFood, setTypeFood] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [stateFavoriteRecipes, setStateFavoriteRecipes] = useState([]);

  useEffect(() => {
    const { updateCurrentPath, history } = props;
    const { location: { pathname } } = history;
    updateCurrentPath(pathname);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setStateFavoriteRecipes(favoriteRecipes);
  }, []);

  const handleShareButton = (type, id) => {
    const hRef = `http://localhost:3000/${type}s/${id}`;
    copy(hRef);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), COPY_MESSAGE_TIMEOUT);
  };

  const removeFavoriteRecipe = (favoriteRecipes, id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setStateFavoriteRecipes(newFavoriteRecipes);
  };

  const handleFavoriteRecipeButton = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    removeFavoriteRecipe(favoriteRecipes, id);
  };

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterAll(true) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => {
          setFilterAll(false);
          setTypeFood('food');
        } }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFilterAll(false);
          setTypeFood('drink');
        } }
      >
        Drinks
      </button>
      { filterAll ? (
        stateFavoriteRecipes.map((fav, index) => (
          <div key={ fav.id } className="favorite-recipes">
            <Link to={ `/${fav.type}s/${fav.id}` }>
              <img
                src={ fav.image }
                alt={ fav.name }
                className="horizontal-image"
                data-testid={ `${index}-horizontal-image` }
              />

              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {(fav.type === 'food')
                  ? `${fav.nationality} - ${fav.category}`
                  : fav.alcoholicOrNot}

              </p>
              <p data-testid={ `${index}-horizontal-name` }>{fav.name}</p>
            </Link>
            { showMessage && <p className="copy-message">Link copied!</p> }
            <button
              type="button"
              onClick={ () => handleShareButton(fav.type, fav.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share"
              />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleFavoriteRecipeButton(fav.id) }
              src={ blackHeartIcon }
            >
              <img
                src={ blackHeartIcon }
                alt="Favorite"
              />
            </button>
          </div>
        ))
      ) : (
        stateFavoriteRecipes.filter(({ type }) => type === typeFood).map((fav, index) => (
          <div key={ fav.id } className="favorite-recipes">
            <Link to={ `/${fav.type}s/${fav.id}` }>
              <img
                src={ fav.image }
                alt={ fav.name }
                className="horizontal-image"
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {(fav.type === 'food')
                  ? `${fav.nationality} - ${fav.category}`
                  : fav.alcoholicOrNot}

              </p>
              <p data-testid={ `${index}-horizontal-name` }>{fav.name}</p>
            </Link>
            { showMessage && <p className="copy-message">Link copied!</p> }
            <button
              type="button"
              onClick={ () => handleShareButton(fav.type, fav.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share"
              />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleFavoriteRecipeButton(fav.id) }
              src={ blackHeartIcon }
            >
              <img
                src={ blackHeartIcon }
                alt="Favorite"
              />
            </button>
          </div>
        ))
      )}
    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  updateCurrentPath: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateCurrentPath: (pathName) => dispatch(nameHeader(pathName)),
});

export default connect(null, mapDispatchToProps)(FavoriteRecipes);
