import * as types from '../constants';

const initialAuth = {authorised: false, checking: true, login: '', password: ''};

export const auth = (state = initialAuth, action) => {
    switch(action.type){
        case types.AUTH:
            return {
                ...state,
                authorised: action.payload.authorised
            }
        case types.CHECK_TOKEN:
            return {
                ...state,
                checking: true
            }
        case types.VERIFY:
            return {
                ...state,
                checking: false
            }
        case types.TYPE_TO_AUTH:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}