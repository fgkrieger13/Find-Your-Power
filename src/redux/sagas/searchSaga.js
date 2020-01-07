import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Initiates the GET of search results
function* fetchSearch(action) {
  try {
    console.log('in fetchSearch', action.payload);
    const response = yield axios.get(`/api/search/${action.payload.string}`);    
    yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
  } catch (error) {
    console.log('SEARCH get request failed', error);
  }
}

function* searchSaga() {
    yield takeLatest('SEARCH_TERM', fetchSearch);  
  }


export default searchSaga;

