import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import ImageUpload from '../ImageUpload/ImageUpload';
import CountMyConnections from '../CountMyConnections/CountMyConnections';

class MyProfile extends Component {

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header-container">
        {this.props.user.avatar ? <img className="public-profile-avatar" src={this.props.user.avatar} />
        :
        <div className="profile-photo">
        <ImageUpload/>
        </div>}
        {/* <img className="public-profile-avatar" src={this.props.user.avatar} />
          <ImageUpload/> */}
          
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
        <div className="profile-button-placement">
          <div className="profile-edit-button-placement">
          <EditProfileModal />
          </div>
          <div className="profile-edit-button-placement">
            <LogOutButton className="profile-view-connected-button" />
          </div>
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
            <CountMyConnections user={this.props.user} profile={this.props.profile} />
            <button className="profile-view-connected-button">View</button>
          </div>
        </div>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>

      </div>

    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.userActivityReducer[0],
});

export default connect(mapStateToProps)(MyProfile);
