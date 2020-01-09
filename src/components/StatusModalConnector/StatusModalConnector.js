import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class StatusModalConnector extends Component {

  state = {
    open: false,
  }

  componentDidMount() {

  }

  // open modal when Status button is clicked
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
                <h2>You Connected {this.props.activity.connecting_first_name} and {this.props.activity.connecting_to_first_name}</h2>
                {/* Display status of response from each connectee in the initiated connection */}
                <table>
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
                </table>
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

export default connect(mapStateToProps)(StatusModalConnector);
