import * as types from '../constants';

const initialState = {comments: []};

export const comments = (state = initialState, action) => {
    switch(action.type){
        case types.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload.comment]
            }
        case types.SET_COMMENT_LIST:
            return {
                ...state,
                comments: action.payload.comments
            }
        default:
            return state;
    }
}