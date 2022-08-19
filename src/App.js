import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="meals">
      <Switch>
        {/* Rota apenas para testes */}
        <Route path="/" component={ SearchBar } />
      </Switch>
    </div>
  );
}

export default App;
