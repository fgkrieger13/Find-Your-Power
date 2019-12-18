import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* editUserProfile(action) {
  try {
    yield axios.put(`/api/myprofile/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_USER' })
  } catch (error) {
    console.log('Edit profile put request failed', error);
  }
}

function* editUserProfileSaga() {
  yield takeLatest('UPDATE_USER_PROFILE', editUserProfile);
}

export default editUserProfileSaga;