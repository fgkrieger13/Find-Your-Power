import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchPage extends Component {
  render() {
    return (
      <table>
        <tbody>

          {this.props.results.map(result =>
            <tr>
              <td><img className="search-avatar" src={result.avatar}/></td>
              <td><h3>{result.first_name} {result.last_name}</h3></td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}


export default SearchPage;
