// const liveSearchReducer = (state = '', action) => {
//     switch (action.type) {
//       case 'SET_SEARCH_TERM':
//         yield put({type: 'FETCH_SEARCH', payload: action.payload});
//         return action.payload;
//       default:
//         return state;
//     }
//   };
  
//   export default liveSearchReducer;

// This reducer contains live search results
const liveSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEARCH_RESULTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default liveSearchReducer;