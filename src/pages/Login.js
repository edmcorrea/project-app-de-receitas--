import PropTypes from 'prop-types';
import React from 'react';
import '../styles/login.css';
import imgLogo from '../images/HungryEnd.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  enableButton = () => {
    const { email, password } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const six = 6;
    if (email.match(regex) && password.length > six) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  }

  handleImput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => { this.enableButton(); });
  };

  submitButton = () => {
    const { email } = this.state;
    const { history } = this.props;
    const valueToken = 1;
    const object = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(object));
    localStorage.setItem('mealsToken', valueToken);
    localStorage.setItem('cocktailsToken', valueToken);
    history.push('/foods');
  }

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form className="login-form">
              <span className="login-form-title">
                <img src={ imgLogo } alt="logo" />
              </span>
              <div className="wrap-input">
                <input
                  className={email !== "" ? 'has-val' : 'input'}
                  data-testid="email-input"
                  type="email"
                  name="email"
                  onChange={ this.handleImput }
                  value={ email }
                />
                <span className="focus-input" data-placeholder="Email"> </span>
              </div>

              <div className="wrap-input">
                <input
                  className={password !== "" ? 'has-val' : 'input'}
                  data-testid="password-input"
                  type="password"
                  name="password"
                  onChange={ this.handleImput }
                  value={ password }
                />
                <span className="focus-input" data-placeholder="Senha"> </span>
              </div>

              <div className="container-login-form-btn">
                <button
                  className="login-form-btn"
                  data-testid="login-submit-btn"
                  type="button"
                  disabled={ isDisable }
                  onClick={ this.submitButton }
                >
                  Entrar
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
