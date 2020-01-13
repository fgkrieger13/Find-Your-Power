import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Fetches public user's profile information
function* fetchProfile(action) {
  try {
    const response = yield axios.get(`/api/publicprofile/${action.payload.profileId}`);    
    yield put({ type: 'SET_PROFILE', payload: response.data });
  } catch (error) {
    console.log('Public profile get request failed', error);
  }
}

// Fetches public user's connections activity
function* fetchPublicActivity(action) {
  console.log('in fetchPublicActivity with:', action.payload);
  
  try {
    const response = yield axios.get(`/api/publicprofile/connections/${action.payload.profile_id}`);    
    yield put({ type: 'SET_PUBLIC_ACTIVITY', payload: response.data });
  } catch (error) {
    console.log('Public profile activity get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_PROFILE', fetchProfile);
  yield takeLatest('FETCH_PUBLIC_ACTIVITY', fetchPublicActivity);

}

export default userSaga;

