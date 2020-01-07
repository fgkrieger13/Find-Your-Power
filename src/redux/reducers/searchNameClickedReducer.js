// This reducer contains the id from a user clicked on in modal search
const searchNameClickedReducer = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_NAME_CLICKED':
            return action.payload;
        default:
            return state;
    }
};

export default searchNameClickedReducer;