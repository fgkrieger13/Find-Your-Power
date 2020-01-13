import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  loginCarolyn = () => {
    this.setState({
      username: 'carolyn.hawkins@gmail.com',
      password: 'Hello123',
    })
  }

  loginBrigette = () => {
    this.setState({
      username: 'brigittemetts@gmail.com',
      password: 'Hello123',
    })
  }

  render() {
    return (
      <div className="login-container">
        <div>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <form onSubmit={this.login}>
            <h1><span onClick={this.loginCarolyn}>L</span>ogi<span onClick={this.loginBrigette}>n</span></h1>
            <label htmlFor="username">
              <input
                type="text"
                name="username"
                placeholder="EMAIL"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </form>
        </div>
        <div className="login-buttons-container">
          <input
            className="log-in"
            type="submit"
            name="submit"
            value="Log In"
            onClick={this.login}
          />
          <input
            type="button"
            className="register"
            value="Register"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          />
          <input
            type="button"
            className="forgot-password"
            value="Forgot Password"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_FORGOT_PASSWORD' }) }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);