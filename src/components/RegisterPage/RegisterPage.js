import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterPage extends Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();
    // checks if all info has been entered
    if (this.state.username && this.state.password && this.state.first_name && this.state.last_name) {
      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;
      // checks if password meets requirements
      if (this.state.password.match(lowerCaseLetters) && this.state.password.match(upperCaseLetters) && this.state.password.match(numbers) && this.state.password.length >= 7) {
        this.props.dispatch({
          type: 'REGISTER',
          payload: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
          },
        });
      } else {
        this.props.dispatch({ type: 'REGISTRATION_PASSWORD_ERROR' });
      }
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="register-container">
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert"> {this.props.errors.registrationMessage}</h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User.</h1>
          <input
            placeholder="FIRST NAME"
            type="text"
            value={this.state.first_name}
            onChange={this.handleInputChangeFor('first_name')}
          />
          <input
            placeholder="LAST NAME"
            type="text"
            value={this.state.last_name}
            onChange={this.handleInputChangeFor('last_name')}
          />
          <input
            placeholder="EMAIL"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <input
            placeholder="PASSWORD"
            type="password"
            value={this.state.password}
            onClick={this.handleShowPasswordRule}
            onChange={this.handleInputChangeFor('password')}
          />
          <div className="register-buttons-container">
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
              onClick={this.registerUser}
            />
            <input
              className="log-in"
              type="button"
              value="Login"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            />
            </div>
            <div>
              <p>Password must contain a <b>capital</b> and <b>lowercase letter</b>, <b>one number</b>, and be at least <b>7 characters long.</b></p>
            </div>
          </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);