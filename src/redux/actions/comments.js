import * as types from '../constants';
import {notify} from "./notification";

export const getComments = (coinid = null) => dispatch => {
    const token = localStorage.getItem('token');

    return fetch('/comments/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({coinid, token})
    })
        .then(res => res.json())
        .then(({comments}) => {
            dispatch({
                type: types.SET_COMMENT_LIST,
                payload: {comments}
            })
        })
}

export const addComment = comment => dispatch => {
    const token = localStorage.getItem('token');

    return fetch('/comments/add/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({...comment, token})
    })
        .then(res => res.json())
        .then(({comment, added, message}) => {
            if(added){
                dispatch({
                    type: types.ADD_COMMENT,
                    payload: {comment}
                })
            }else{
                dispatch(notify(message));
            }
        })
}