import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  pallete: {
    primary: {500: '#f29475'}
  }
})

class EditProfileModal extends Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    console.log(this.state.open)
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };
  render() {
    return (
      <div>
        <button className="profile-view-connected-button" onClick={this.handleClickOpen}>
          Edit
      </button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              color="primary"
              margin="normal"
              label="Email"
              multiline={true}
              value={this.props.state.username}
              fullWidth
            />
            <TextField
              margin="normal"
              label="First Name"
              multiline={true}
              value={this.props.state.first_name}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Last Name"
              multiline={true}
              value={this.props.state.last_name}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Zipcode"
              multiline={true}
              value={this.props.state.zipcode}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Skills"
              multiline={true}
              value={this.props.state.skills}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Services"
              multiline={true}
              value={this.props.state.services}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Current Roles"
              multiline={true}
              value={this.props.state.roles}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Bio"
              multiline={true}
              value={this.props.state.bio}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <button className="profile-edit-cancel-button" onClick={this.handleClose} color="primary">
              Cancel
          </button>
            <button className="profile-view-connected-button" onClick={this.handleClose} color="primary">
              Save
          </button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}
export default (EditProfileModal);
