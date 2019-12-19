import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchProfile(action) {
  try {
    const response = yield axios.get(`/api/publicprofile/${action.payload.profileId}`);    
    yield put({ type: 'SET_PROFILE', payload: response.data });
  } catch (error) {
    console.log('Public profile get request failed', error);
  }
}

function* fetchPublicActivity(action) {
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

