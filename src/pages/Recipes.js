import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeDrinkCard from '../components/RecipeDrinkCard';
import RecipeMealCard from '../components/RecipeMealCard';
import { nameHeader, searchRecipes } from '../redux/actions';
import fetchEndPoint from '../services/fetchFunction';
import '../styles/recipes.css';

function Recipes(props) {
  const { getRecipes, updateCurrentPath, recipes } = props;
  const { match: { path }, history } = props;

  const [type, setType] = useState('meals');
  const [currentFilter, setCurrentFilter] = useState('All');
  const [categoriesRecipes, setCategoriesRecipes] = useState([]);
  const maxRecipesToShow = 12;

  useEffect(() => {
    if (path === '/foods') {
      setType('meals');
    } else {
      setType('drinks');
    }
  }, [path]);

  useEffect(() => {
    updateCurrentPath(path);
  }, [path]);

  const fetchAllRecipes = () => {
    if (path === '/foods') {
      getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, [type]);

  const getFirstFive = (categories) => {
    const maxCategories = 5;
    setCategoriesRecipes(categories.filter((_category, index) => index < maxCategories));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      console.log(type);
      if (path === '/foods') {
        const categories = await fetchEndPoint('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

        getFirstFive(await categories.meals);
      } else {
        const categories = await fetchEndPoint('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

        getFirstFive(await categories.drinks);
      }
    };
    fetchCategories();
  }, [type]);

  const fetchRecipesByCategory = async ({ target: { value } }) => {
    if (value !== currentFilter) {
      if (path === '/foods') {
        const categories = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;

        getRecipes(categories);
      } else {
        const categories = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;

        getRecipes(categories);
      }
      setCurrentFilter(value);
    } else {
      fetchAllRecipes();
    }
  };

  return (
    <div className="recipes">
      <Header history={ history } />
      <div>
        { categoriesRecipes
        && categoriesRecipes.map((category) => (
          <button
            key={ category.strCategory }
            id="button-category"
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ fetchRecipesByCategory }
            value={ category.strCategory }
          >
            {category.strCategory}
          </button>))}
        <button
          onClick={ fetchAllRecipes }
          type="button"
          data-testid="All-category-filter"
          value="All"
        >
          All

        </button>
      </div>
      <section className="sectionRecipesCards">
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
      </section>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  getRecipes: PropTypes.func.isRequired,
  updateCurrentPath: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (endpoint) => dispatch(searchRecipes(endpoint)),
  updateCurrentPath: (pathName) => dispatch(nameHeader(pathName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
