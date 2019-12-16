import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectionMade from '../ConnectionMade/ConnectionMade'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'





class ActivityPage extends Component {

  componentDidMount() {
    
    
    this.props.dispatch({ type: 'FETCH_USER_ACTIVITY' })
  }

  render() {
    return (
      <div>
        <div>
          <p>
            This is the ActivityPage
          </p>
          <div>
            {/* {this.props.userActivity.filter(allActivity => allActivity.user_id === this.props.user.id && allActivity.user_id === allActivity.connector_id)[0].first_name} */}
          </div>
          <pre>
            {/* {JSON.stringify(this.props.userActivity.filter(allActivity => allActivity.user_id === this.props.user.id && allActivity.user_id === allActivity.connector_id)[0].first_name, null, 2)} */}
          </pre>
          <pre>
            {JSON.stringify(this.props.userActivity, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userActivity: state.userActivityReducer,
});

export default connect(mapStateToProps)(ActivityPage);