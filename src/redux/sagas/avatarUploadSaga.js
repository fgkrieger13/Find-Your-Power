import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Initiate POST of profile picture
function* postImageUrl(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const data = {
            imageUrl: action.payload
        }

       yield axios.post('/api/imageurl', data, config);

    } catch (error) {
        console.log('image post request failed', error);
    }

}

function* imageSaga() {
    yield takeLatest('POST_IMAGE_URL', postImageUrl);
  }
  
  export default imageSaga;