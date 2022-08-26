import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import { nameHeader } from '../redux/actions';
import '../styles/favoriteRecipes.css';

function FavoriteRecipes(props) {
  const [filterAll, setFilterAll] = useState(true);
  const [typeFood, setTypeFood] = useState('');
  const [stateFavoriteRecipes, setStateFavoriteRecipes] = useState([]);

  useEffect(() => {
    const { updateCurrentPath, history } = props;
    const { location: { pathname } } = history;
    updateCurrentPath(pathname);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setStateFavoriteRecipes(favoriteRecipes);
  }, []);

  return (
    <div className="favorite-recipes">
      <Header />
      <section className="filter-btns">
        <button
          className="btn-type-meals"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterAll(true) }
        >
          All
        </button>
        <button
          className="btn-type-meals"
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
          className="btn-type-meals"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilterAll(false);
            setTypeFood('drink');
          } }
        >
          Drinks
        </button>
      </section>
      {stateFavoriteRecipes
        .filter((recipe) => {
          if (filterAll) return recipe;
          return recipe.type === typeFood;
        })
        .map((fav, index) => (
          <div key={ fav.id } className="card-favorite-recipe">
            <Link to={ `/${fav.type}s/${fav.id}` }>
              <img
                src={ fav.image }
                alt={ fav.name }
                className="horizontal-image"
                data-testid={ `${index}-horizontal-image` }
              />
              <div>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {(fav.type === 'food')
                    ? `${fav.nationality} - ${fav.category}`
                    : fav.alcoholicOrNot}
                </p>
                <h3 data-testid={ `${index}-horizontal-name` }>{fav.name}</h3>
              </div>
            </Link>
            <section>
              <ShareButton path={ `${fav.type}s` } id={ fav.id } />
              <FavoriteButton productId={ fav.id } />
            </section>
          </div>
        ))}
    </div>
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
