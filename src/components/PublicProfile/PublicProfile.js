import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import InitiateConnection from '../InitiateConnection/InitiateConnection';
import CountConnections from '../CountConnections/CountConnections';
import DefaultImage from '../DefaultImage/DefaultImage';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class PublicProfile extends Component {

  state = {
    open: false,
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch({ type: 'FETCH_PROFILE', payload: { profileId: id } })
    this.props.dispatch({ type: 'FETCH_PUBLIC_ACTIVITY', payload: { profile_id: id } })
  }

  initiateConnection = (connectingId) => {
    console.log('connecting_id:', connectingId, 'connector_id:', this.props.user.id);
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    })
  };

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
              <div className="profile-connected-summary-container">
          {/* checks if publicActivity array has returned from server */}
          {(this.props.publicActivity.length > 0) ?
            <h1>Connections Made: {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).length} </h1>
            :
            <h1>Connections Made: 0 </h1>

          }
          {/* opens public view of connections Modal */}
          <button onClick={this.handleClickOpen}
            className="profile-view-connected-button">
            View
          </button>
          {/* Modal */}
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <div className="profile-connected-count-container">
              <DialogTitle id="form-dialog-count-title"><div className="underline"><h2>{this.props.profile.first_name} Connected</h2></div></DialogTitle>
              <DialogContent>
                {(this.props.publicActivity.length > 0) ?
                  <table>
                    <tbody>
                      {this.props.publicActivity.map((activity) =>
                        <tr key={activity.connections_id}>
                          <td><img className="activity-pending-avatar-small" src={activity.connecting_avatar} /></td>
                          <td><h3>{activity.connecting_first_name} {activity.connecting_last_name}</h3></td>
                          <td><h1>+</h1></td>
                          <td><img className="activity-pending-avatar-small" src={activity.connecting_to_avatar} /></td>
                          <td><h3>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</h3></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  : ''
                }
              </DialogContent>
            </div>
          </Dialog>
        </div>
            </div>
          </div>
          : ''
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  publicActivity: state.publicActivityReducer,
  user: state.user,
  profile: state.publicProfileReducer[0],
});

export default connect(mapStateToProps)(PublicProfile);
