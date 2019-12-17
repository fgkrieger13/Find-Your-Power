import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* connectingAccepted(action) {
  try {
    yield axios.put('/api/activity/connecting-accept', action.payload);
    yield put({ type: 'FETCH_USER_ACTIVITY' })
  } catch (error) {
    console.log('Connecting accept put request failed', error);
  }
}

function* connectingToAccepted(action) {
  try {
    yield axios.put('/api/activity/connecting-to-accept', action.payload);
    yield put({ type: 'FETCH_USER_ACTIVITY' })
  } catch (error) {
    console.log('Connecting to accept put request failed', error);
  }
}

function* fetchUserActivity() {
  try {
    const response = yield axios.get('/api/activity');    
    yield put({ type: 'SET_USER_ACTIVITY', payload: response.data });
  } catch (error) {
    console.log('Activity get request failed', error);
  }
}


function* userSaga() {
  yield takeLatest('FETCH_USER_ACTIVITY', fetchUserActivity);
  yield takeLatest('CHANGE_CONNECTING_ACCEPTED', connectingAccepted);
  yield takeLatest('CHANGE_CONNECTING_TO_ACCEPTED', connectingToAccepted);
}

export default userSaga;

