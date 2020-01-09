import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem';

// Search page where users can search for other users
class SearchPage extends Component {

  // initiates search in database based on search term that user inputs
  liveSearch = (event) => {
    this.props.dispatch({ type: 'SEARCH_TERM', payload: { string: event.target.value } })
  }

  render() {
    return (
      <div className="search-page-background">
      <div className="search-page-container">
        <div>
          <h2>Search for a name or service</h2>
          <input className="search-field" onChange={this.liveSearch} />
        </div>
        <div>
          <SearchItem results={this.props.results} />
          </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  results: state.liveSearchReducer
});

export default connect(mapStateToProps)(SearchPage);
