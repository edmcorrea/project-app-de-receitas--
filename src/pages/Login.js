import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        Email:
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ this.handleImput }
          value={ email }
        />
        Senha:
        <input
          data-testid="password-input"
          type="text"
          name="password"
          onChange={ this.handleImput }
          value={ password }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isDisable }
          onClick={ this.submitButton }
        >
          Entrar
        </button>
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
