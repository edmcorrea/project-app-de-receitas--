import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route
          path="/foods/:idRecipe/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/foods/:idRecipe"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/foods"
          component={ Recipes }
        />
        <Route
          path="/drinks/:idRecipe/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/drinks/:idRecipe"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/drinks"
          component={ Recipes }
        />
        <Route
          path="/profile"
          component={ Profile }
        />
        <Route
          path="/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />
        <Route
          path="/"
          component={ Login }
        />
      </Switch>
    </div>
  );
}

export default App;
