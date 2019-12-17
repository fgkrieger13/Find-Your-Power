import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';


class MyProfile extends Component {

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.username}!
      </h1>

        <LogOutButton className="log-in" />
        <pre>
          {JSON.stringify(this.props.user, null, 2)}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyProfile);
