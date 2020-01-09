import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class StatusModalConnectee extends Component {

  state = {
    open: false,
  }

  // open modal when Status button is close
  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true
    })
  };

  // close modal
  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    })
  };

  render() {
    return (
      <>
        <td>
          <button className="profile-view-connected-button" onClick={this.handleClickOpen}>
            Status
          </button>
          {this.props.activity ?
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <div className="activity-connected-status-modal">
                <DialogTitle><div className="underline"><h1>Connection Status</h1></div></DialogTitle>
                <DialogContent>
                  {/* Display the connector and connectees involved in connection */}
                  <h2>{this.props.activity.connector_first_name} connected you and {
                    (this.props.activity.connecting_to_id === this.props.user.id) ? this.props.activity.connecting_first_name
                      : this.props.activity.connecting_to_first_name
                  }
                  </h2>
                  {/* Display status of each connectee's response to connection invitation */}
                  <table>
                    {this.props.activity.connecting_to_id === this.props.user.id ?
                      <tbody>
                        <tr>
                          <td><img className="activity-pending-avatar-small" src={this.props.activity.connecting_to_avatar} /></td>
                          <td>{this.props.activity.connecting_to_first_name} {this.props.activity.connecting_to_last_name}</td>
                          <td>{this.props.activity.connecting_to_accepted ?
                            <p>Accepted Connection</p>
                            : <p>Response Pending</p>
                          }</td>
                        </tr>
                        <tr>
                          <td><img className="activity-pending-avatar-small" src={this.props.activity.connecting_avatar} /></td>
                          <td>{this.props.activity.connecting_first_name} {this.props.activity.connecting_last_name}</td>
                          <td>{this.props.activity.connecting_accepted ?
                            <p>Accepted Connection</p>
                            : <p>Response Pending</p>
                          }</td>
                        </tr>
                      </tbody>
                      :
                      <tbody>
                        <tr>
                          <td><img className="activity-pending-avatar-small" src={this.props.activity.connecting_avatar} /></td>
                          <td>{this.props.activity.connecting_first_name} {this.props.activity.connecting_last_name}</td>
                          <td>{this.props.activity.connecting_accepted ?
                            <p>Accepted Connection</p>
                            : <p>Response Pending</p>
                          }</td>
                        </tr>
                        <tr>
                          <td><img className="activity-pending-avatar-small" src={this.props.activity.connecting_to_avatar} /></td>
                          <td>{this.props.activity.connecting_to_first_name} {this.props.activity.connecting_to_last_name}</td>
                          <td>{this.props.activity.connecting_to_accepted ?
                            <p>Accepted Connection</p>
                            : <p>Response Pending</p>
                          }</td>
                        </tr>
                      </tbody>
                    }
                  </table>
                  {/* Display the connector and connectees involved in connection and display payment message */}
                  <h2>
                    Show {this.props.activity.connector_first_name + ' '}
                    some connection affection by sending a kickback via Venmo.
                  </h2>
                  <h2>
                    {this.props.activity.connector_first_name + '\'s '}Venmo:{' ' + this.props.activity.connector_venmo}
                  </h2>
                  <div className="kickback-venmo-description">
                    <h5>
                      This transaction needs to happen between you and the recipient on the Venmo application.
                      Find Your Power does not facilitate any exchange of money between you and the recipient.
                      We are only providing you with their Venmo username.
                  </h5>
                  </div>
                </DialogContent>
              </div>
            </Dialog>
            : ''
          }
        </td>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.publicProfileReducer[0],
});

export default connect(mapStateToProps)(StatusModalConnectee);
