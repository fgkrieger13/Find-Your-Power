import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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