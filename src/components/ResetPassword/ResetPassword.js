/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import axios from 'axios';


class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      userId: ''
    };
  }

  async componentDidMount() {
    let token = this.props.match.params.id;
    try {
      console.log('on reset password view, token:', token);
      // retrieves token from url to access user info
      const response = await axios.get(`api/resetpassword/${token}`);
      if (response.data.message === 'password reset link a-ok') {
        // sets state to user info
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
          userId: response.data.id
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    let username = this.state.username
    let id = this.state.userId
    let password = this.state.password
    let token = this.props.match.params.id;
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    // checks if new password meets password requirements
    if (password.match(lowerCaseLetters) && password.match(upperCaseLetters) && password.match(numbers) && password.length >= 7) {
      try {
        // sends updated password to server
        const response = await axios.put(
          `api/resetpassword/${id}`,
          {
            username,
            password,
            token,
          },
        );
        console.log(response.data);
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
          this.props.dispatch({ type: 'LOGIN', payload: { username: username, password: password } });
          this.props.history.push('/');
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      this.props.dispatch({ type: 'REGISTRATION_PASSWORD_ERROR' });
    }
  };

  render() {
    if (this.state.error) {
      // renders error message, directs user back to log in page
      return (
        
          <div>
            <center>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <input
              type="button"
              className="forgot-password"
              value="Home"
              onClick={() => { this.props.history.push('/') }}
            />
            </center>
          </div>
        
      );
    }
    if (this.state.isLoading) {
      // renders loading message 
      return (
        <div>
          <h4>Loading User Data...</h4>
        </div>
      );
    }
    // renders input field to reset password
    return (
      <div>
        <center>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <h1>Reset Password</h1>
        <form className="password-form">
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              onChange={this.handleChange('password')}
            />
          </label>
          <input
          className="reset-password"
          type="button"
          value="Update Password" 
          onClick={this.updatePassword}
          
          />
        </form>

        <p>Password must contain a <b>capital</b> and <b>lowercase letter</b>, <b>one number</b>, and be at least <b>7 characters long.</b></p>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ResetPassword);
