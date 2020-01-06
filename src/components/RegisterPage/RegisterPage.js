import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/light-on-dark.png';
import axios from 'axios';


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
      if (this.state.password.match(lowerCaseLetters) && this.state.password.match(upperCaseLetters) && this.state.password.match(numbers) && this.state.password.length>=7 ){
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
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div className="register-container">
          <form onSubmit={this.registerUser}>
            <h1>Register User.</h1>
            <div>
              <input
                placeholder="FIRST NAME"
                type="text"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </div>
            <div>
              <input
                placeholder="LAST NAME"
                type="text"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />

            </div>
            <div>
              <input
                placeholder="EMAIL"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />

            </div>
            <div>
              <input
                placeholder="PASSWORD"
                type="password"
                value={this.state.password}
                onClick={this.handleShowPasswordRule}
                onChange={this.handleInputChangeFor('password')}
              />
              <p>password must contain at least one <b>capital letter</b>, one <b>lowercase letter</b>, one <b>number</b>, and be at least 7 charectors long</p>
            </div>
            <div>
              <input
                className="register"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
          {this.state.showPasswordRule ?
            <div id="message">
              <h3>Password must contain the following:</h3>
              <p id="letter"
                className={this.state.passwordLetter ? "valid-password" : "invalid-password"}
              >
                A <b>lowercase</b> letter
              </p>
              <p id="capital" className="invalid-password">A <b>capital (uppercase)</b> letter</p>
              <p id="number" className="invalid-password">A <b>number</b></p>
              <p id="length" className="invalid-password">Minimum <b>8 characters</b></p>
            </div>
            : ''
          }
        </div>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </button>
        </center>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

