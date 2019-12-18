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


function* userSaga() {
  yield takeLatest('FETCH_PROFILE', fetchProfile);
}

export default userSaga;

