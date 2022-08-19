import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="meals">
      <Switch>
        <SearchBar />
      </Switch>
    </div>
  );
}

export default App;
