import React, { Component } from 'react';
import { connect } from 'react-redux';

// Show name and avatar of search result
// On click of username user will be directed to that person's profile
class SearchInitiateConnection extends Component {

  state = {
    clicked: '',
  }
  render() {
    return (
      <table>
        <tbody>
          {(this.props.results.filter(result => result.id !== this.props.user.id && result.id !== this.props.profile.id)).map((result) =>
            <tr>
              <td><img className="search-avatar2" src={result.avatar} /></td>
              <td>
                <h3 onClick={() => {
                  
                  this.setState({ clicked: result.id })
                }}>
                  {result.first_name} {result.last_name}
                </h3>
              </td>
              {this.state.clicked == result.id ?
                <td><button className='clicked' onClick={() => {
                  this.setState({ clicked: result.id })
                }}>X</button></td>
                :
                <td><button className='clicked' onClick={() => {
                  this.setState({ clicked: result.id })
                  this.props.dispatch({ type: 'SEARCH_NAME_CLICKED', payload: result.id })
                }}></button></td>
              }
            </tr>
          )}
        </tbody>
        <pre>{JSON.stringify(this.state.clicked, null, 2)}</pre>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.publicProfileReducer[0],
});

export default connect(mapStateToProps)(SearchInitiateConnection);