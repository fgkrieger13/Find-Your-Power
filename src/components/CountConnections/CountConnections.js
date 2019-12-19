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
                        <DialogTitle id="form-dialog-title">{this.props.profile.first_name} is Connected With</DialogTitle>
                        <DialogContent>
                            {(this.props.publicActivity.length > 0) ?
                                <table>
                                    <tbody>
                                        {(this.props.publicActivity.filter(activity =>
                                            ((activity.connecting_id === this.props.profile.id || activity.connecting_to_id === this.props.profile.id)
                                                && activity.connecting_accepted && activity.connecting_to_accepted))).map((activity) =>
                                                    <tr key={activity.connections_id}>
                                                        {activity.connecting_id === this.props.profile.id ?
                                                            <td>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</td>
                                                            :
                                                            <td>{activity.connecting_first_name} {activity.connecting_last_name}</td>
                                                        }
                                                        <td>through</td>
                                                        <td>{activity.connector_first_name} {activity.connector_last_name}</td>
                                                    </tr>
                                                )}
                                    </tbody>
                                </table>
                                : ''
                            }
                        </DialogContent>
                        <DialogTitle id="form-dialog-title">{this.props.profile.first_name} Connected</DialogTitle>
                        <DialogContent>
                            {(this.props.publicActivity.length > 0) ?
                                <table>
                                    <tbody>
                                        {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).map((activity) =>
                                            <tr key={activity.connections_id}>
                                                <td>{activity.connecting_first_name} {activity.connecting_last_name}</td>
                                                <td>with</td>
                                                <td>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                : ''
                            }
                        </DialogContent>
                        <DialogActions>
                            <button className="profile-edit-cancel-button" onClick={this.handleClose} color="primary">
                                Cancel
                            </button>
                        </DialogActions>
                        <pre>{JSON.stringify(this.state, null, 2)}</pre>
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
