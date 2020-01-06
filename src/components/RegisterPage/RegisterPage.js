import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/light-on-dark.png';
import axios from 'axios';


class RegisterPage extends Component {
  state = {
    // showPasswordRule: false,
    // passwordLetter: false,
    // passwordCapital: false,
    // passwordNumber: false,
    // passwordLength: false,
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  };

  // handleShowPasswordRule = () => {
  //   this.setState({
  //     ...this.state,
  //     showPasswordRule: true
  //   })
  // }

  // checkPassword = () => {
  //   console.log('in checkPassword', this.state.password);
  //   let lowerCaseLetters = /[a-z]/g;
  //   if (this.state.password.match(lowerCaseLetters)) {
  //     console.log('in password match!');
  //     this.setState({
  //       ...this.state,
  //       passwordLetter: true
  //     })
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       passwordLetter: false
  //     })
  //   }
  // }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password && this.state.first_name && this.state.last_name) {
      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g;
      if (this.state.password.match(lowerCaseLetters)){
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
        console.log('ERROR PASSWORD DOES NOT MEET REQUIREMENTS');
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

  // handleInputPassword = (event) => {
  //   this.setPassword(event)
  //   this.checkPassword();
  // }

  // setPassword = (event) => {
  //   this.setState({
  //     ...this.state,
  //     password: event.target.value,
  //   })
  // }

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
                // onChange={(e) =>{ 
                //   this.setPassword(e)
                //   this.checkPassword()
                // }}
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

