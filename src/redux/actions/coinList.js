import * as types from "../constants";
import {notify} from "./notification";

const setList = ({coins, count}) => ({
    type: types.SET_LIST,
    payload: {coins, count}
})

export const clearList = () => ({
    type: types.CLEAR_LIST
})

export const setOffset = dispatch => ({
    pageChange: pageNumber => dispatch({
        type: types.SET_OFFSET,
        payload: {offset: pageNumber}
    }),
    setLimit: e => dispatch({
        type: types.SET_LIMIT,
        payload: {limit: e.target.value}
    })
})

export const getCoins = criteria => dispatch => {
    return fetch('http://localhost:3001/coins/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({criteria})
    })
        .then(res => res.json())
        .then(({coins, count, message, notfound}) => {
            if(notfound){
                dispatch(notify(message));
            }
            dispatch(setList({coins, count}));
        })
}