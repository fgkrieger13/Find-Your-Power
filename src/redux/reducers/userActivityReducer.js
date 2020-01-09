// This reducer contains the user's own connection activity
const userActivityReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_ACTIVITY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userActivityReducer;
  