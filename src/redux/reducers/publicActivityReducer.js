const publicActivityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PUBLIC_ACTIVITY':
            return action.payload;
        default:
            return state;
    }
};

export default publicActivityReducer;