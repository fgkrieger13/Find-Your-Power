import React, { Component } from 'react';
import { connect } from 'react-redux';

// Show name and avatar of search result
// On click of username user will be directed to that person's profile
class SearchInitiateConnection extends Component {
  render() {
    return (
      <table>
        <tbody>
          {this.props.results.map(result =>
            <tr>
              <td><img className="search-avatar2" src={result.avatar} /></td>
              <td>
                <h3 onClick={() => {this.props.dispatch({type: 'SEARCH_NAME_CLICKED', payload: result.id})}}>
                  {result.first_name} {result.last_name}
                </h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default connect()(SearchInitiateConnection);