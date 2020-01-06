import React, { Component } from 'react';

class SearchItem extends Component {
  render() {
    return (

      <table>
        <tbody>
          {this.props.results.length > 0 && 
            <tr>
            <td></td>
            <td></td>
            <td ><h2 className="search-head-row">Services</h2></td>
            <td><h2 className="search-head-row">Skills</h2></td>
            </tr>}
          {this.props.results.map(result =>
            <tr>
              <td><img className="search-avatar" src={result.avatar} /></td>
              <td><h3>{result.first_name} {result.last_name}</h3></td>
              <td><p>{result.services}</p></td>
              <td><p>{result.skills}</p></td>
            </tr>
          )}
        </tbody>
      </table>

    )
  }
}

export default SearchItem;