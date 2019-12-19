import React, { Component } from 'react';
import { connect } from 'react-redux';


class CountConnections extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PUBLIC_ACTIVITY', payload: { profile_id: this.props.profile.id } })
    }

    render() {
        return (
            <>
                <div className="profile-connected-summary-container">
                    {(this.props.publicActivity.length > 0) ?
                        <h1>Connected {(this.props.publicActivity.filter(activity => activity.connector_id === this.props.profile.id)).length} people</h1>
                        : <h1>Connected 0 people</h1>
                    }
                    <button onClick={this.viewConnections}
                        className="profile-view-connected-button">
                        View
                    </button>
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
