import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeMealCard from '../components/RecipeMealCard';
import searchRecipes from '../redux/actions';
import RecipeDrinkCard from '../components/RecipeDrinkCard';

function Recipes(props) {
  const { getRecipes, recipes } = props;
  const [type, setType] = useState('meals');
  const { match: { path } } = props;
  const maxRecipesToShow = 12;
  console.log(props);

  useEffect(() => {
    if (path === '/foods') {
      getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setType('meals');
    } else {
      getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setType('drinks');
    }
  }, []);

  return (
    <div>
      { recipes[type]
        && recipes[type].filter((_recipe, index) => index < maxRecipesToShow)
          .map((recipe, index) => {
            if (type === 'meals') {
              return (<RecipeMealCard
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
              />);
            }
            return (<RecipeDrinkCard
              key={ recipe.idDrink }
              recipe={ recipe }
              index={ index }
            />);
          })}
      <p>Recipes</p>
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (endpoint) => dispatch(searchRecipes(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
