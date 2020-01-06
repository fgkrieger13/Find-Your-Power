import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem';

class SearchPage extends Component {

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
        {/* <pre>{JSON.stringify(this.props.results, null, 2)}</pre> */}
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
