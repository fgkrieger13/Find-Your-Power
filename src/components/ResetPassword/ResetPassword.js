/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import axios from 'axios';

const loading = {
    margin: '1em',
    fontSize: '24px',
};

const title = {
    pageTitle: 'Password Reset Screen',
};

class ResetPassword extends Component {
      constructor() {
        super();

        this.state = {
          username: '',
          password: '',
          updated: false,
          isLoading: true,
          error: false,
        };
      }

      async componentDidMount() {
        let token = this.props.match.params.id;
        // console.log('on reset password view, token:', token);
        
        // const {
        //   match: {
        //     params: { token },
        //   },
        // } = this.props;
        try {
          console.log('on reset password view, token:', token);
          const response = await axios.get(`api/resetpassword/${token}`);
          // console.log(response);
          if (response.data.message === 'password reset link a-ok') {
            this.setState({
              username: response.data.username,
              updated: false,
              isLoading: false,
              error: false,
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
            [name]: event.target.value,
        });
    };

    //   updatePassword = async (e) => {
    //     e.preventDefault();
    //     const { username, password } = this.state;
    //     const {
    //       match: {
    //         params: { token },
    //       },
    //     } = this.props;
    //     try {
    //       const response = await axios.put(
    //         'http://localhost:3003/updatePasswordViaEmail',
    //         {
    //           username,
    //           password,
    //           resetPasswordToken: token,
    //         },
    //       );
    //       console.log(response.data);
    //       if (response.data.message === 'password updated') {
    //         this.setState({
    //           updated: true,
    //           error: false,
    //         });
    //       } else {
    //         this.setState({
    //           updated: false,
    //           error: true,
    //         });
    //       }
    //     } catch (error) {
    //       console.log(error.response.data);
    //     }
    //   };

    render() {
        //     const {
        //  password, error, isLoading, updated 
        // } = this.state;

        // if (error) {
        //   return (
        //     <div>
        //       <HeaderBar title={title} />
        //       <div style={loading}>
        //         <h4>Problem resetting password. Please send another reset link.</h4>
        //         <LinkButtons
        //           buttonText="Go Home"
        //           buttonStyle={homeButton}
        //           link="/"
        //         />
        //         <LinkButtons
        //           buttonStyle={forgotButton}
        //           buttonText="Forgot Password?"
        //           link="/forgotPassword"
        //         />
        //       </div>
        //     </div>
        //   );
        // }
        // if (isLoading) {
        //   return (
        //     <div>
        //       <HeaderBar title={title} />
        //       <div style={loading}>Loading User Data...</div>
        //     </div>
        //   );
        // }
        return (
            <div>
                <h1>Reset Password</h1>
                <form className="password-form" onSubmit={this.updatePassword}>
                    <label htmlFor="password">
                        <input
                            type="password"
                            name="password"
                            placeholder="PASSWORD"
                            onChange={this.handleChange('password')}
                        />
                    </label>
                    <button>Update Password</button>
                </form>
                <div>
                    <p>Password must contain a <b>capital</b> and <b>lowercase letter</b>, <b>one number</b>, and be at least <b>7 characters long.</b></p>
                </div>
                {/* {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <LinkButtons
              buttonStyle={loginButton}
              buttonText="Login"
              link="/login"
            />
          </div>
        )}
        <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" /> */}
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        );
    }
}

// ResetPassword.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string.isRequired,
//     }),
//   }),
// };

export default connect()(ResetPassword);
