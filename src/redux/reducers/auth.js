import * as types from '../constants';

const initialAuth = {authorised: false, checking: true, registered: false, login: '', password: ''};

export const auth = (state = initialAuth, action) => {
    switch(action.type){
        case types.REGISTERED:
            return {
                ...state,
                registered: true,
                login: '',
                password: ''
            }
        case types.AUTH:
            return {
                ...state,
                authorised: action.payload.authorised,
                role: action.payload.role,
                registered: false,
                password: '',
                login: '',
                checking: false
            }
        case types.LOGOUT:
            return {
                ...state,
                authorised: false
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