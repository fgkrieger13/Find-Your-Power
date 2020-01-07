// This reducer contains the profile information of a public user
const publicProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return action.payload;
        default:
            return state;
    }
};

export default publicProfileReducer;