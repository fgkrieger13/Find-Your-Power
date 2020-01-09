// This reducer contains the id from a user clicked on in modal search
const searchNameClickedReducer = (state = 0, action) => {
    switch (action.type) { 
        case 'SEARCH_NAME_CLICKED':
            console.log('reducer hit');
            return action.payload;
        default:
            return state;
    }
};

export default searchNameClickedReducer;