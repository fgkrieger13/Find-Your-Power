import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchUserActivity() {
  try {

    const response = yield axios.get('/api/activity');

    
    yield put({ type: 'SET_USER_ACTIVITY', payload: response.data });
    
    
  } catch (error) {
    console.log('User get request failed', error);
  }
}


function* userSaga() {
  yield takeLatest('FETCH_USER_ACTIVITY', fetchUserActivity);
}

export default userSaga;

