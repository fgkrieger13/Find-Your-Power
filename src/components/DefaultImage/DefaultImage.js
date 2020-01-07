import React, { Component } from 'react';

// Display default profile image until user adds their own profile picture
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