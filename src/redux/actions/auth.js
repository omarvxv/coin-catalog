import * as types from "../constants";
import {notify} from "./notification";

// обработчик полей ввода компонента Login
export const typeToLogin = e => ({
    type: types.TYPE_TO_AUTH,
    payload: {
        [e.target.name]: e.target.value
    }
})

const auth = authorised => ({
    type: types.AUTH,
    payload: {authorised}
})

export const authorization = userData => dispatch => {
    return fetch('http://localhost:3001/auth/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json())
        .then(({token, login, message, authorised}) => {
            if (authorised) {
                localStorage.setItem('token', token);
                localStorage.setItem('login', login);
                dispatch(auth(true));
            } else {
                dispatch(auth(false));
            }
            dispatch(notify(message));
        })
}

export const authentication = () => dispatch => {
    const token = localStorage.getItem('token');
    // состояние проверки. на стр 53 снимается
    dispatch({type: types.CHECK_TOKEN})

    return fetch('http://localhost:3001/authentication/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({token})
    })
        .then(res => res.json())
        .then(res => {
            dispatch(auth(res.authorised));
            dispatch({type: types.VERIFY})
            dispatch(notify(res.message));
            if (res.authorised) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('login', res.login);
            }
        })
}