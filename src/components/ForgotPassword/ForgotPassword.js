import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    console.log('in sendEmail');
    e.preventDefault();
    const { email } = this.state;
    //checks if email field is blank 
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    }
    else {
      try {
        const response = await axios.post('api/forgotpassword',
          { email });
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

    return (
      <div className="password-reset-container">
        <h1>Forgot Password</h1>
        <form className="profile-form" onSubmit={this.sendEmail}>
          <input
            id="email"
            label="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="EMAIL ADDRESS"
          />
        </form>
        {showNullError && (
          <p>The email address cannot be blank.</p>
        )}
        {showError && (
          <p>That email address is not recognized. Please try again or register a new account.</p>
        )}
        {messageFromServer === 'recovery email sent' && (
          <p>Password reset email successfully sent!</p>
        )}
        <div className="password-buttons-container">
          <input
            type="button"
            className="reset-password"
            value="Send Password Reset Link"
            onClick={(e) => { this.sendEmail(e) }}
          />
          <input
            type="button"
            className="log-in"
            value="Log In"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          />
          <input
            type="button"
            className="register"
            value="Register"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ForgotPassword);