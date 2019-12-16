import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          <pre>
          {JSON.stringify(this.props.userActivity, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userActivity: state.userActivityReducer,
});

export default connect(mapStateToProps)(ActivityPage);