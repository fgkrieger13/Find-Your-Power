import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectionMade from '../ConnectionMade/ConnectionMade'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'





class ActivityPage extends Component {

  componentDidMount() {


    this.props.dispatch({ type: 'FETCH_USER_ACTIVITY' })
  }

  render() {
    return (
      <div className="container">
        <div className="activity-page">
          <p>
            This is the ActivityPage
          </p>
          <div className="pending-connections">
            <h3>Pending Connections</h3>
            {(this.props.userActivity.length > 0) ?
              (this.props.userActivity.filter(activity =>
                ((activity.connecting_id === this.props.user.id || activity.connecting_to_id === this.props.user.id)
                  && (!activity.connecting_accepted || !activity.connecting_to_accepted)))).map((activity) =>
                    <div key={activity.connections_id}>
                      <div className="avatar">
                        This is where the image will go!
                      </div>
                      <div>
                          {activity.connecting_id === this.props.user.id ? 
                            <h4>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</h4>
                            :
                            <h4>{activity.connecting_first_name} {activity.connecting_last_name}</h4>
                          }
                        <p>Suggested by:</p>
                        <p>{activity.connector_first_name} {activity.connector_last_name}</p>
                      </div>
                      <div>
                        <p>Message:</p>
                        <p>{activity.message}</p>
                      </div>
                      <div>
                        {( activity.connecting_id === this.props.user.id && !activity.connecting_accepted) || (activity.connecting_to_id === this.props.user.id && !activity.connecting_to_accepted) ? 
                        <div>
                          <button>Accept</button>
                          <button>Deny</button> 
                        </div>
                        :
                        ''
                      }
 
                      </div>
                    </div>
                  )
              : ''
            }
            {/* <div>
              <div className="avatar">
                This is where the image will go!
              </div>
              <div>
                <h4>NAME OF PERSON TO CONNECT WITH</h4>
                <p>Suggested by:</p>
                <p>NAME OF CONNECTOR</p>
              </div>
              <div>
                <p>Message:</p>
                <p>MESSAGE GOES HERE</p>
              </div>
              <div>
                <button>Accept</button>
                <button>Deny</button>
              </div>
            </div> */}
          </div>
          <div className="people-who-connected-you">
            <h3>People Who Connected You</h3>
            {(this.props.userActivity.length > 0) ?
              <table>
                <tbody>
                  {(this.props.userActivity.filter(activity =>
                    ((activity.connecting_id === this.props.user.id || activity.connecting_to_id === this.props.user.id)
                      && activity.connecting_accepted && activity.connecting_to_accepted))).map((activity) =>
                        <tr key={activity.connections_id}>
                          <td>{activity.connector_first_name} {activity.connector_last_name}</td>
                          <td>connected you with</td>
                          {activity.connecting_id === this.props.user.id ?
                            <td>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</td>
                            :
                            <td>{activity.connecting_first_name} {activity.connecting_last_name}</td>
                          }
                        </tr>
                      )}
                </tbody>
              </table>
              : ''
            }
          </div>
          <div className="people-you-connected">
            <h3>People You Connected</h3>
            {(this.props.userActivity.length > 0) ?
              <table>
                <tbody>
                  {(this.props.userActivity.filter(activity => activity.connector_id === this.props.user.id)).map((activity) =>
                    <tr key={activity.connections_id}>
                      <td>{activity.connecting_first_name} {activity.connecting_last_name}</td>
                      <td>connected with</td>
                      <td>{activity.connecting_to_first_name} {activity.connecting_to_last_name}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              : ''
            }
          </div>
          <pre>
            {JSON.stringify(this.props.userActivity, null, 2)}
            {/* {JSON.stringify((this.props.userActivity.filter(activity => activity.connector_id === this.props.user.id)), null, 2)} */}
          </pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userActivity: state.userActivityReducer,
});

export default connect(mapStateToProps)(ActivityPage);