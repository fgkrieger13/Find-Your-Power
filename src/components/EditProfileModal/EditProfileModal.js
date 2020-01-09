import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// When Edit button is clicked modal opens up where user profile information can be updated
class EditProfileModal extends Component {
  state = {
    open: false,
    id: this.props.user.id,
    username: '',
    first_name: '',
    last_name: '',
    zipcode: '',
    skills: '',
    services: '',
    roles: '',
    bio: '',
    venmo: '',
  }

  // opens modal when Edit button is clicked
  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
      username: this.props.user.username,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      zipcode: this.props.user.zipcode,
      skills: this.props.user.skills,
      services: this.props.user.services,
      roles: this.props.user.roles,
      bio: this.props.user.bio,
      venmo: this.props.user.venmo
    })
  };

  // handles modal close
  handleClose = () => {
    this.setState({
      open: false
    })
  };

  // When Save button is clicked
  handleSave = () => {
    this.props.dispatch({ type: 'UPDATE_USER_PROFILE', payload: this.state })
    this.setState({
      ...this.state,
      open: false
    })
  }

  // Updates property with information that user inputs
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <button className="profile-view-connected-button" onClick={this.handleClickOpen}>
          Edit
      </button>
      {/* Text fields to enter profile information */}
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleInputChangeFor('username')}
              margin="normal"
              label="Email"
              multiline={true}
              value={this.state.username}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('first_name')}
              margin="normal"
              label="First Name"
              multiline={true}
              value={this.state.first_name}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('last_name')}
              margin="normal"
              label="Last Name"
              multiline={true}
              value={this.state.last_name}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('zipcode')}
              margin="normal"
              label="Zipcode"
              multiline={true}
              value={this.state.zipcode}
              fullWidth
            />
             <TextField
              onChange={this.handleInputChangeFor('venmo')}
              margin="normal"
              label="Venmo Username"
              multiline={true}
              value={this.state.venmo}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('skills')}
              margin="normal"
              label="Skills"
              multiline={true}
              value={this.state.skills}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('services')}
              margin="normal"
              label="Services"
              multiline={true}
              value={this.state.services}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('roles')}
              margin="normal"
              label="Current Roles"
              multiline={true}
              value={this.state.roles}
              fullWidth
            />
            <TextField
              onChange={this.handleInputChangeFor('bio')}
              margin="normal"
              label="Bio"
              multiline={true}
              value={this.state.bio}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <button className="profile-edit-cancel-button" onClick={this.handleClose}>
              Cancel
          </button>
            <button className="profile-view-connected-button" onClick={this.handleSave}>
              Save
          </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(EditProfileModal);
