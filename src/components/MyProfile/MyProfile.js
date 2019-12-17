import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';


class MyProfile extends Component {

  state = {
    edit: false,
    first_name: '',
    last_name: '',
    username: '',
    zipcode: '',
    skills: '',
    services: '',
    roles: '',
    bio: '',
  }

  editProfileButtonClick = () => {
    console.log(this.state.edit)
    this.setState({
      ...this.state,
      edit: !this.state.edit,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      username: this.props.user.username,
      zipcode: this.props.user.zipcode,
      skills: this.props.user.skills,
      services: this.props.user.services,
      roles: this.props.user.roles,
      bio: this.props.user.bio,
    })
  }

  render() {
    return (
      <>{!this.state.edit ? 
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
        <div className="profile-button-placement">
          <div className="profile-edit-button-placement">
            <button className="profile-view-connected-button" onClick={this.editProfileButtonClick}>Edit</button>
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
            <h1>Connected 2,000 people</h1>
            <button className="profile-view-connected-button">View</button>
          </div>
        </div>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>

      </div>
      : <div><p onClick={this.editProfileButtonClick}>special modal</p>
      
      <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre></div>
}</>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyProfile);
