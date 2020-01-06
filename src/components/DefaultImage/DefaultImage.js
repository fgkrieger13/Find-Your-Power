import React, { Component } from 'react';

class DefaultImage extends Component {
  render() {
    return (

      <div>
          <img className="public-profile-avatar" src={require('./default-avatar.jpg')} />
      </div>

    )
  }
}

export default DefaultImage;