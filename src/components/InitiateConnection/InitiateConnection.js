import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    pallete: {
        primary: { 500: '#f29475' }
    }
})

class initiateConnectionModal extends Component {

    state = {
        open: false,
        connection: {
            connecting_to_id: '',
            message: ''
        },
    }

    componentDidMount() {

    }

    searchUsers = (event) => {
        console.log('searching users');
        this.setState({
            ...this.state,
            connection: {
                ...this.state.connection,
                connecting_to_id: Number(event.target.value),
            }
        })
    }

    addMessage = (event) => {
        this.setState({
            ...this.state,
            connection: {
                ...this.state.connection,
                message: event.target.value
            }
        })
    }

    handleSendConnectionRequest = (connectingId) => {
        console.log('connecting_id:', connectingId, 'connector_id:', this.props.user.id, 'connecting_to_id:', this.state.connection.connecting_to_id);
        this.props.dispatch({ type: 'SEND_CONNECTION-REQUEST', payload: { connecting_id: connectingId, connecting_to_id: this.state.connection.connecting_to_id, connector_id: this.props.user.id, message: this.state.connection.message } });
        this.handleClose();
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
                <div>
                    <button className="profile-view-connected-button" onClick={this.handleClickOpen}>
                        Help Connect
                    </button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Help person connect</DialogTitle>
                        <DialogContent>
                            <TextField
                                onChange={this.searchUsers}
                                color="primary"
                                margin="normal"
                                label="connecting_to_id"
                                multiline={true}
                                type='number'
                                value={this.state.connection.connecting_to_id}
                                fullWidth
                            />
                            <TextField
                                onChange={this.addMessage}
                                color="primary"
                                margin="normal"
                                label="message"
                                multiline={true}
                                value={this.state.connection.message}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <button className="profile-edit-cancel-button" onClick={this.handleClose} color="primary">
                                Cancel
                            </button>
                            <button className="profile-view-connected-button" onClick={() => this.handleSendConnectionRequest(this.props.profile.id)} color="primary">
                                Connect
                            </button>
                        </DialogActions>
                        <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    </Dialog>

                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    profile: state.publicProfileReducer[0],
});

export default connect(mapStateToProps)(initiateConnectionModal);
