import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CountMyConnections extends Component {

    // Get user activity
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER_ACTIVITY', payload: { profile_id: this.props.user.id} })
    }

    // Navigate user to My Activity page when View button is clicked
    directToMyActivity = () => {
        this.props.history.push('/activity');
    }

    render() {
        return (
            <div>
                {/* Display the number of connections the user has made on their profile page */}
                {(this.props.userActivity.length > 0) ?
                    <h1>Connections Made: {(this.props.userActivity.filter(activity => activity.connector_id === this.props.user.id)).length} </h1>
                    : <h1>0 Connections Made</h1>
                }
                <button className="profile-view-connected-button" onClick={this.directToMyActivity}>
                    View    
                </button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    userActivity: state.userActivityReducer,
});

export default withRouter(connect(mapStateToProps)(CountMyConnections));