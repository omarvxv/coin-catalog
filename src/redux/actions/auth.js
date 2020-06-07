import * as types from "../constants";
import {notify} from "./notification";

// обработчик полей ввода компонента Login
export const typeToLogin = e => ({
    type: types.TYPE_TO_AUTH,
    payload: {
        [e.target.name]: e.target.value
    }
})

export const auth = ({authorised, role}) => ({
    type: types.AUTH,
    payload: {authorised, role}
})

export const logout = () => dispatch => {
    dispatch({type: types.LOGOUT});
    dispatch(notify('You have successfully logged out'))
    localStorage.removeItem('token');
    localStorage.removeItem('login');
}

export const registration = userData => dispatch => {
    return fetch('/auth/registration/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json())
        .then(data => {
            dispatch(notify(data.message));
            if(data.registered){
                dispatch({
                    type: types.REGISTERED
                })
            }
        })
}

export const authorization = userData => dispatch => {
    return fetch('/auth/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json())
        .then(({token, login, message, authorised, role, id}) => {
            if (authorised) {
                localStorage.setItem('token', token);
                localStorage.setItem('login', login);
                localStorage.setItem('id', id);
            }
            dispatch(auth({authorised, role}));
            dispatch(notify(message));
        })
}

export const authentication = () => dispatch => {
    const token = localStorage.getItem('token');
    // состояние проверки. на стр 78 снимается
    dispatch({type: types.CHECK_TOKEN})

    return fetch('/auth/authentication/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({token})
    })
        .then(res => res.json())
        .then(({authorised, role, message, token, login}) => {
            dispatch(auth({authorised, role}));
            dispatch({type: types.VERIFY});
            dispatch(notify(message));
            if (authorised) {
                localStorage.setItem('token', token);
                localStorage.setItem('login', login);
            }
        })
}