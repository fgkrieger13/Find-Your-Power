import React, { Component } from 'react';
import { connect } from 'react-redux';

class CountMyConnections extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER_ACTIVITY', payload: { profile_id: this.props.user.id} })
    }

    directToMyActivity = () => {
        console.log('View button!!');
    }


    render() {
        return (
            <div>
                {(this.props.userActivity.length > 0) ?
                    <h1>Connections Made: {(this.props.userActivity.filter(activity => activity.connector_id === this.props.user.id)).length} </h1>
                    : <h1>0 Connections Made</h1>
                }
            </div>

        )
    }

}


const mapStateToProps = state => ({
    user: state.user,
    userActivity: state.userActivityReducer,
});

export default connect(mapStateToProps)(CountMyConnections);