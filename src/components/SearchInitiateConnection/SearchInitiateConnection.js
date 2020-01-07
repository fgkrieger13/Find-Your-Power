import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
                <h3 onClick={() => this.props.history.push(`/profile/${result.id}`)}>
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

export default withRouter(SearchInitiateConnection);