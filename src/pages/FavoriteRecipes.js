import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import FilterBtns from '../components/FilterBtns';
import Header from '../components/Header';
import { nameHeader } from '../redux/actions';

const arrFavoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

function FavoriteRecipes(props) {
  const [filterAll, setFilterAll] = useState(true);
  const [typeFood, setTypeFood] = useState('');
  useEffect(() => {
    const { updateCurrentPath, history } = props;
    const { location: { pathname } } = history;
    updateCurrentPath(pathname);
  }, []);

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
      {arrFavoriteRecipes.map((favorite, index) => (
        <div key={ index }>
          {(typeFood === favorite.type || filterAll) && (
            <div key={ favorite.id }>
              <img
                src={ favorite.image }
                alt={ favorite.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {(favorite.type === 'food')
                  ? `${favorite.nationality} - ${favorite.category}`
                  : favorite.alcoholicOrNot}

              </p>
              <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
              <p data-testid={ `${index}-horizontal-share-btn` }>shareBtn</p>
              <p data-testid={ `${index}-horizontal-favorite-btn` }>favoriteBtn</p>
            </div>
          )}
        </div>

      ))}
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
