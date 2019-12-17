import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';


class MyProfile extends Component {

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header-container">
          <div className="profile-photo">
            <p className="profile-photo-text" onClick={() => { }}>add a photo</p>
          </div>
          <div className="profile-name-email-container">
            <div className="profile-name">
              <h2>{this.props.user.first_name} {this.props.user.last_name}</h2>
            </div>
            <div className="profile-email">
              <h3>{this.props.user.username}</h3>
            </div>
          </div>
        </div>
        <div className="profile-bio-container">
          <h3>Bio:</h3>
          <p className="profile-bio">{this.props.user.bio}</p>
        </div>
        <div className="profile-info-container">
          <div className="profile-info-header">
            <h2>My Info</h2>
          </div>
          <div className="profile-info-copy">
            <div className="profile-info-copy-sections">
              <h3 className="profile-info-current-roles">Current Roles:</h3>
              <p>{this.props.user.roles}</p>
            </div>
            <div className="profile-info-copy-sections">
              <h3>Services:</h3>
              <p>{this.props.user.services}</p>
            </div>
            <div className="profile-info-copy-sections">
              <h3>Skills:</h3>
              <p>{this.props.user.skills}</p>
            </div>
          </div>
          <div className="profile-connected-summary-container">
            <h1>Connected 2,000 people</h1>
            <button className="profile-view-connected-button">View</button>
          </div>
        </div>

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
