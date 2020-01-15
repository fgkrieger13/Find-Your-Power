import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchInitiateConnection from '../SearchInitiateConnection/SearchInitiateConnection';

class initiateConnectionModal extends Component {

  state = {
    open: false,
    connection: {
      connecting_to_id: this.props.id,
      message: ''
    },
  }

  // searches through database for users
  liveSearch = (event) => {
    this.props.dispatch({ type: 'SEARCH_TERM', payload: { string: event.target.value } })
  }

  // handles which user id is entered for search
  searchUsers = (event) => {
    this.setState({
      ...this.state,
      connection: {
        ...this.state.connection,
        connecting_to_id: Number(event.target.value),
      }
    })
  }

  // handles input for connection message
  addMessage = (event) => {
    this.setState({
      ...this.state,
      connection: {
        ...this.state.connection,
        message: event.target.value
      }
    })
  }

  // initiate new connection request
  handleSendConnectionRequest = (connectingId) => {
    this.props.dispatch({ type: 'SEND_CONNECTION_REQUEST', payload: { connecting_id: connectingId, connecting_to_id: this.props.id, connector_id: this.props.user.id, message: this.state.connection.message } });
    swal(`Connection request sent!`);
    this.handleClose();
  }

  // opens modal when button is clicked
  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true
    })
  };

  // handles modal close
  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    })
  };

  render() {
    return (
      <>
        <div >
          <button className="profile-view-connected-button" onClick={this.handleClickOpen}>
            Connect
          </button>
          {/* Search to select which user to connect with */}
          <Dialog className="initiate-connection-container" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><h2>Select the person you would like to connect {this.props.profile.first_name} with</h2></DialogTitle>
            <DialogContent>
              <TextField
                onChange={this.liveSearch}
                color="primary"
                margin="normal"
                label="Search"
                multiline={true}
                variant="outlined"
                fullWidth
              />
              <div>
          <SearchInitiateConnection results={this.props.results} />
          </div>
              <TextField
                onChange={this.addMessage}
                color="primary"
                margin="normal"
                label="Message"
                multiline={true}
                rows="6"
                variant="outlined"
                value={this.state.connection.message}
                fullWidth
              />
            </DialogContent>
            <DialogActions >
              <button className="profile-view-connected-button" onClick={() => this.handleSendConnectionRequest(this.props.profile.id)} color="primary">
                Connect
              </button>
              <button className="profile-edit-cancel-button" onClick={this.handleClose} color="primary">
                Cancel
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.publicProfileReducer[0],
  results: state.liveSearchReducer,
  id: state.searchNameClickedReducer,
});

export default connect(mapStateToProps)(initiateConnectionModal);