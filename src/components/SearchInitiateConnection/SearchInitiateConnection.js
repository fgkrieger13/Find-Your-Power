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
          {this.props.results.map(result =>
          <tr>
              <td><img className="search-avatar2" src={result.avatar} /></td>
              <td>
                <h3 onClick={() => {this.props.dispatch({type: 'SEARCH_NAME_CLICKED', payload: result.id})
              this.setState({clicked: result.id})}}>
                  {result.first_name} {result.last_name}
                </h3>
              </td>
              {this.state.clicked == result.id ?
              <td><button className='clicked' onClick={() => {this.setState({clicked: result.id}) 
              }}>X</button></td>
              :
              <td><button className='clicked' onClick={() => {
                this.setState({clicked: result.id})
                }
            }></button></td>
               }
            </tr> 
          )}
        </tbody>
        <pre>{JSON.stringify(this.state.clicked, null, 2)}</pre>
      </table>
    )
  }
}

export default connect()(SearchInitiateConnection);