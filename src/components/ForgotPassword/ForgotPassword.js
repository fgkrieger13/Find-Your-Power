/* eslint-disable no-console */
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
                    {
                        email,
                    },
                );
                console.log(response.data);
                // if (response.data === 'recovery email sent') {
                //     this.setState({
                //         showError: false,
                //         messageFromServer: 'recovery email sent',
                //         showNullError: false,
                //     });
                // }
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


        //  else {
        //     try {
        //         const response = await axios.post(
        //             'http://localhost:3003/forgotPassword',
        //             {
        //                 email,
        //             },
        //         );
        //         console.log(response.data);
        //         if (response.data === 'recovery email sent') {
        //             this.setState({
        //                 showError: false,
        //                 messageFromServer: 'recovery email sent',
        //                 showNullError: false,
        //             });
        //         }
        //     } catch (error) {
        //         console.error(error.response.data);
        //         if (error.response.data === 'email not in db') {
        //             this.setState({
        //                 showError: true,
        //                 messageFromServer: '',
        //                 showNullError: false,
        //             });
        //         }
        //     }
        // }
    };

    render() {
        const {
            email, messageFromServer, showNullError, showError
        } = this.state;

        return (
            <div className="register-container">
                <h1>Forgot Password.</h1>
                <form className="profile-form" onSubmit={this.sendEmail}>
                    <input
                        id="email"
                        label="email"
                        value={email}
                        onChange={this.handleChange('email')}
                        placeholder="Email Address"
                    />
                    <button>Send Password Reset Email</button>
                </form>
                {showNullError && (
                    <div>
                        <p>The email address cannot be null.</p>
                    </div>
                )}
                {showError && (
                    <div>
                        <p>
                            That email address isn&apos;t recognized. Please try again or
                            register for a new account.
                        </p>
                    </div>
                )}
                {messageFromServer === 'recovery email sent' && (
                    <div>
                        <h3>Password Reset Email Successfully Sent!</h3>
                    </div>
                )}
                <center>
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                    >
                        Login
                    </button>
                </center>
                <center>
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                    >
                        Register
                    </button>
                </center>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(ForgotPassword);
