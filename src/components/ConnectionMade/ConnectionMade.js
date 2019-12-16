import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'





class ConnectionMade extends Component {


  render() {
    return (
      <div>
        <span>
            {this.props.connection.first_name + ' '} 
            {this.props.connection.last_name} 
        </span>
        <span> connected with </span>
        <span>
            {this.props.connection.first_name + ' '} 
            {this.props.connection.last_name} 
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userActivity: state.userActivityReducer,
});

export default connect(mapStateToProps)(ConnectionMade);