import React, {Component} from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


class SearchPage extends Component {

  liveSearch = (event) => {
    this.props.dispatch({type: 'SEARCH_TERM', payload: {string: event.target.value}})
  }
  
    render() {
      return (
        <div>
        <div>
        <h3>Search for a name or service</h3>
        <input onChange={this.liveSearch}/>
          <p>
            This is the search SearchPage
          </p>
          <ul>
          </ul>
          <pre>{JSON.stringify(this.props.liveSearchReducer, null, 2)}</pre>
        </div>
      </div>
    )}
  }

  const mapStateToProps = state => ({
    user: state.user,
    liveSearchReducer: state.liveSearchReducer
  });
  
  export default connect(mapStateToProps)(SearchPage);
