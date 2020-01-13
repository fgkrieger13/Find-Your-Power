import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CountConnections extends Component {

  state = {
    open: false,
  }

  componentDidMount() {
    console.log(this.props.profile_id);
    this.props.dispatch({ type: 'FETCH_PUBLIC_ACTIVITY', payload: { profile_id: this.props.profile.id } })
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
        <div className="profile-connected-summary-container">
          {/* checks if publicActivity array has returned from server */}
          {(this.props.publicActivity.length > 0) &&
            <h1>Connections Made: {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).length} </h1>
            
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
                      {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).map((activity) =>
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
      </>
    )
  }
}

const mapStateToProps = state => ({
  profile_id: state.publicProfileReducer[0].id,
  user: state.user,
  publicActivity: state.publicActivityReducer,
});

export default connect(mapStateToProps)(CountConnections);