import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatusModalConnector from '../StatusModalConnector/StatusModalConnector';
import StatusModalConnectee from '../StatusModalConnectee/StatusModalConnectee';
import { withRouter } from 'react-router-dom';

class ActivityPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER_ACTIVITY' })
  }

  // changes connecting_accepted to true if user is connecting
  changeConnectingAccepted = (activity) => {
    this.props.dispatch({ type: 'CHANGE_CONNECTING_ACCEPTED', payload: activity });
  }

  // changes connecting_to_accepted to true if user is connecting_to
  changeConnectingToAccepted = (activity) => {
    this.props.dispatch({ type: 'CHANGE_CONNECTING_TO_ACCEPTED', payload: activity });
  }

  // changes active to false if either connectee denies connection
  denyConnection = (activity) => {
    this.props.dispatch({ type: 'DENY_CONNECTION', payload: activity })
  }

  render() {
    return (
      <div className="activity-container">
        <div className="activity-pending-connections-container">
          <div className="activity-title"><h1>Pending Connections</h1></div>
          {/* checks if userActivity array has been returned from server */}
          {(this.props.userActivity.length > 0) ?
            (this.props.userActivity.filter(activity =>
              // checks if user is either connecting or connecting_to & if connection is pending by at least one person
              ((activity.connecting_id === this.props.user.id || activity.connecting_to_id === this.props.user.id)
                && (!activity.connecting_accepted || !activity.connecting_to_accepted)))).map((activity) =>
                  <div key={activity.connections_id}>
                    <div className="activity-pending-single-row">
                      <div className="activity-pending-leftmost">
                        <div className="avatar">
                          {/* checks if user is connecting or connecting_to, conditionally renders other person avatar*/}
                          {activity.connecting_id === this.props.user.id ?
                            <img className="activity-pending-avatar" onClick={() => this.props.history.push(`/profile/${activity.connecting_to_id}`)}
                              src={activity.connecting_to_avatar} />
                            :
                            <img className="activity-pending-avatar" onClick={() => this.props.history.push(`/profile/${activity.connecting_id}`)}
                              src={activity.connecting_avatar} />
                          }
                        </div>
                        {/* checks if user is connecting or connecting_to, conditionally renders other person name*/}
                        {activity.connecting_id === this.props.user.id ?
                          <div className="activity-pending-title">
                            <h3 onClick={() => this.props.history.push(`/profile/${activity.connecting_to_id}`)}>
                              {activity.connecting_to_first_name} {activity.connecting_to_last_name}</h3>
                          </div>
                          :
                          <div className="activity-pending-title">
                            <h3 onClick={() => this.props.history.push(`/profile/${activity.connecting_id}`)}>
                              {activity.connecting_first_name} {activity.connecting_last_name}</h3>
                          </div>
                        }
                      </div>
                      <div className="activity-suggested-by"><h2>Suggested by:</h2></div>
                      <div className="activity-pending-suggestor">
                        <div className="activity-pending-connecting-avatar">
                          <img className="activity-pending-avatar" src={activity.connector_avatar} />
                          <h3 onClick={() => this.props.history.push(`/profile/${activity.connector_id}`)}>
                            {activity.connector_first_name} {activity.connector_last_name}</h3>
                        </div>
                      </div>

                      <div className="activity-pending-message">
                        <h2>Message:</h2>
                        <p>{activity.message}</p>
                      </div>
                      <div>
                        {/* conditionally renders buttons to approve or deny if users response is pending */}
                        {(activity.connecting_id === this.props.user.id && !activity.connecting_accepted) ||
                          (activity.connecting_to_id === this.props.user.id && !activity.connecting_to_accepted) ?
                          <div className="activity-pending-button-container">
                            <button className="activity-pending-accept-button"
                              onClick={
                                activity.connecting_id === this.props.user.id ?
                                  () => this.changeConnectingAccepted(activity)
                                  :
                                  () => this.changeConnectingToAccepted(activity)
                              }>
                              Accept
                            </button>
                            <button className="activity-pending-cancel-button"
                              onClick={() => this.denyConnection(activity)}>
                              Deny
                            </button>
                          </div>
                          :
                          activity.connecting_id === this.props.user.id ?
                            <div className="activity-pending-button-container">
                              <h4>Waiting for {activity.connecting_to_first_name} to accept.</h4>
                            </div>
                            :
                            <div className="activity-pending-button-container">
                              <h4>Waiting for {activity.connecting_first_name} to accept.</h4>
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                )
            : ''
          }
        </div>
        <div className="activity-connected-you-container">
          <div className="activity-title"><h1>People Who Connected You</h1></div>
          {/* checks if userActivity array has been returned from server */}
          {(this.props.userActivity.length > 0) ?
            <table>
              <tbody>
                {(this.props.userActivity.filter(activity =>
                  // checks if user is either connecting or connecting_to & if connection is accepted by both people
                  ((activity.connecting_id === this.props.user.id || activity.connecting_to_id === this.props.user.id)
                    && activity.connecting_accepted && activity.connecting_to_accepted))).map((activity) =>
                      <tr key={activity.connections_id}>
                        <td> <img className="activity-pending-avatar-small" src={activity.connector_avatar} /></td>
                        <td className="activity-connected-you-connector-container">
                          <h3 onClick={() => this.props.history.push(`/profile/${activity.connector_id}`)}>
                            {activity.connector_first_name} {activity.connector_last_name}
                          </h3>
                        </td>
                        <td className="activity-connected-you-with-container"><h2>connected you with</h2></td>
                        {/* checks if user is connecting or connecting_to, conditionally renders other person avatar/name*/}
                        {activity.connecting_id === this.props.user.id ?
                          <>
                            <td><img className="activity-pending-avatar-small" src={activity.connecting_to_avatar} /></td>
                            <td>
                              <h3 onClick={() => this.props.history.push(`/profile/${activity.connecting_to_id}`)}>
                                {activity.connecting_to_first_name} {activity.connecting_to_last_name}
                              </h3>
                            </td>
                          </>
                          :
                          <>
                            <td><img className="activity-pending-avatar-small" src={activity.connecting_avatar} /></td>
                            <td>
                              <h3 onClick={() => this.props.history.push(`/profile/${activity.connecting_id}`)}>
                                {activity.connecting_first_name} {activity.connecting_last_name}
                              </h3>
                            </td>
                          </>
                        }
                        {/* view status of a connection when user is either connecting or connecting_to */}
                        <StatusModalConnectee activity={activity} />
                      </tr>
                    )}
              </tbody>
            </table>
            : ''
          }
        </div>
        <div className="activity-people-you-connected-container">
          <h1>People You Connected</h1>
          {/* checks if userActivity array has been returned from server */}
          {(this.props.userActivity.length > 0) ?
            <table>
              <tbody>
                {/* checks if user is either connector */}
                {(this.props.userActivity.filter(activity => activity.connector_id === this.props.user.id)).map((activity) =>
                  <tr key={activity.connections_id}>
                    <td><img className="activity-pending-avatar-small" src={activity.connecting_avatar} /></td>
                    <td>
                      <h3 onClick={() => this.props.history.push(`/profile/${activity.connecting_id}`)}>
                        {activity.connecting_first_name} {activity.connecting_last_name}</h3>
                    </td>
                    <td><h2>connected with</h2></td>
                    <td><img className="activity-pending-avatar-small" src={activity.connecting_to_avatar} /></td>
                    <td>
                      <h3 onClick={() => this.props.history.push(`/profile/${activity.connecting_to_id}`)}>
                        {activity.connecting_to_first_name} {activity.connecting_to_last_name}
                      </h3>
                    </td>
                    {/* view status of a connection when user is either connector */}
                    <StatusModalConnector activity={activity} />
                  </tr>
                )}
              </tbody>
            </table>
            : ''
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userActivity: state.userActivityReducer,
});

export default withRouter(connect(mapStateToProps)(ActivityPage));