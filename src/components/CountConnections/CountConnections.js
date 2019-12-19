import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class CountConnections extends Component {

  state = {
    open: false,
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PUBLIC_ACTIVITY', payload: { profile_id: this.props.profile.id } })
  }

  handleClickOpen = () => {
    console.log(this.state.open)
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
        <div className="profile-connected-summary-container">
          {(this.props.publicActivity.length > 0) ?
            <h1>Connected {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).length} people</h1>
            : <h1>Connected 0 people</h1>
          }
          <button onClick={this.handleClickOpen}
            className="profile-view-connected-button">
            View
                    </button>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <div className="profile-connected-count-container">
            {/* <DialogTitle id="form-dialog-count-title"><h2>{this.props.profile.first_name} is Connected With</h2></DialogTitle>
            <DialogContent>
              {(this.props.publicActivity.length > 0) ?
                <table>
                  <tbody>
                    {(this.props.publicActivity.filter(activity =>
                      ((activity.connecting_id === this.props.profile.id || activity.connecting_to_id === this.props.profile.id)
                        && activity.connecting_accepted && activity.connecting_to_accepted))).map((activity) =>
                          <tr key={activity.connections_id}>
                            {activity.connecting_id === this.props.profile.id ?
                            <>
                              <td><img className="activity-pending-avatar-small"src={activity.connecting_to_avatar}/></td>
                              <td><h3>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</h3></td>
                              </>
                              :
                              <>
                              <td><img className="activity-pending-avatar-small"src={activity.connecting_avatar}/></td>
                              <td><h3>{activity.connecting_first_name} {activity.connecting_last_name}</h3></td>
                              </>
                            }
                            <td><h3>through</h3></td>
                            <td><img className="activity-pending-avatar-small"src={activity.connector_avatar}/></td>
                            <td><h3>{activity.connector_first_name} {activity.connector_last_name}</h3></td>
                          </tr>
                        )}
                  </tbody>
                </table>
                : ''
              }
            </DialogContent> */}
            <DialogTitle id="form-dialog-count-title"><div className="underline"><h2>{this.props.profile.first_name} Connected</h2></div></DialogTitle>
            <DialogContent>
              {(this.props.publicActivity.length > 0) ?
                <table>
                  <tbody>
                    {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).map((activity) =>
                      <tr key={activity.connections_id}>
                        <td><img className="activity-pending-avatar-small"src={activity.connecting_avatar}/></td>
                        <td><h3>{activity.connecting_first_name} {activity.connecting_last_name}</h3></td>
                        <td><h1>+</h1></td>
                        <td><img className="activity-pending-avatar-small"src={activity.connecting_to_avatar}/></td>
                        <td><h3>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</h3></td>
                      </tr>
                    )}
                  </tbody>
                </table>
                : ''
              }
            </DialogContent>
            </div>
            {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          </Dialog>
          {/* <pre>{JSON.stringify(this.props.publicActivity, null, 2)}</pre> */}
        </div>
        
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  publicActivity: state.publicActivityReducer,
});

export default connect(mapStateToProps)(CountConnections);
