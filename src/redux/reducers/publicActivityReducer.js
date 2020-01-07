// This reducer contains the connection activity of a public user
const publicActivityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PUBLIC_ACTIVITY':
            return action.payload;
        default:
            return state;
    }
};

export default publicActivityReducer;