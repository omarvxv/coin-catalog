import * as types from '../constants';

const initialState = {message: '', notify: false};

export function notification(state = initialState, action){
    switch(action.type){
        case types.NOTIFY:
            return {
                message: action.payload.message,
                notify: true
            }
        case types.CLOSE_NOTIFICATION:
            return {
                notify: false
            }
        default:
            return state;
    }
}