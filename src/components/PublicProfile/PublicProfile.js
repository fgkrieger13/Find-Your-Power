import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import InitiateConnection from '../InitiateConnection/InitiateConnection';
import CountConnections from '../CountConnections/CountConnections';
import DefaultImage from '../DefaultImage/DefaultImage';


class PublicProfile extends Component {

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch({ type: 'FETCH_PROFILE', payload: { profileId: id } })
  }

  viewConnections = () => {

  }

  initiateConnection = (connectingId) => {
    console.log('connecting_id:', connectingId, 'connector_id:', this.props.user.id);
  }

  render() {
    return (
      <>
        {this.props.profile ?

          <div className="profile-container">
            <div className="profile-header-container">

              {this.props.profile.avatar ?
                <img className="public-profile-avatar" src={this.props.profile.avatar} /> :
                <DefaultImage />}
              <div className="profile-name-email-container">
                <div className="profile-name">
                  <h2>{this.props.profile.first_name} {this.props.profile.last_name}</h2>
                </div>
                <div className="profile-email">
                  <h3>{this.props.profile.username}</h3>
                </div>
                <div className="profile-email">
                  <h3>venmo: {this.props.profile.venmo}</h3>
                </div>
              </div>
            </div>
            <div className="profile-bio-container">
              <h3>Bio:</h3>
              <p className="profile-bio">{this.props.profile.bio}</p>
            </div>
            <div className="profile-button-placement">
              <InitiateConnection connectingId={this.props.profile.id} />
            </div>
            <div className="profile-info-container">
              <div className="profile-info-header">
                <h2>My Info</h2>
              </div>
              <div className="profile-info-copy">
                <div className="profile-info-copy-sections">
                  <h3 className="profile-info-current-roles">Current Roles:</h3>
                  <p>{this.props.profile.roles}</p>
                </div>
                <div className="profile-info-copy-sections">
                  <h3>Services:</h3>
                  <p>{this.props.profile.services}</p>
                </div>
                <div className="profile-info-copy-sections">
                  <h3>Skills:</h3>
                  <p>{this.props.profile.skills}</p>
                </div>
              </div>
              <CountConnections profile={this.props.profile} />
            </div>
          </div>
          : ''
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.publicProfileReducer[0],
});

export default connect(mapStateToProps)(PublicProfile);
