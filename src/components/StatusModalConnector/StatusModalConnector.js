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
        <td>
          <button className="profile-view-connected-button" onClick={this.handleClickOpen}>
            Status
                    </button>
          {this.props.activity ?
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Connection Status</DialogTitle>
              <DialogContent>
                <h3>You Connected {this.props.activity.connecting_first_name} and {this.props.activity.connecting_to_first_name}</h3>
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
                <table>
                  <tbody>
                    <tr>
                      <td><img className="activity-pending-avatar-small" src={this.props.activity.connecting_avatar} /></td>
                      <td>{this.props.activity.connecting_first_name} {this.props.activity.connecting_last_name}</td>
                      <td>Kickback Pending</td>
                    </tr>
                    <tr>
                      <td><img className="activity-pending-avatar-small" src={this.props.activity.connecting_to_avatar} /></td>
                      <td>{this.props.activity.connecting_to_first_name} {this.props.activity.connecting_to_last_name}</td>
                      <td>Kickback Pending</td>
                    </tr>
                  </tbody>
                </table>
              </DialogContent>
              {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
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
