import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/foods" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
      </Switch>
    </div>
  );
}

export default App;
