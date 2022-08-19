import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer">
        <Link to="/drinks">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
        </Link>
        <Link to="/foods">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal Icon" />
        </Link>
      </footer>
    );
  }
}

export default Footer;
