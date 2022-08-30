import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIconNew2.png';
import mealIcon from '../images/mealIconNew3.png';
import logo from '../images/logoReverse.png';

import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer">
        <Link to="/drinks">
          <button type="button" className="footer-btn">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
          </button>
        </Link>
        <button type="button" className="footer-btn">
          <img src={ logo } alt="logo" />
        </button>
        <Link to="/foods">
          <button type="button" className="footer-btn">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal Icon" />
          </button>
        </Link>
      </footer>
    );
  }
}

export default Footer;
