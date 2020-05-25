import * as types from "../constants";
import {notify} from "./notification";

const setList = ({coins, count}) => ({ // настраивает список монет
    type: types.SET_LIST,
    payload: {coins, count}
})

export const clearList = () => ({ // очищает список монет
    type: types.CLEAR_LIST
})

export const pageChange = pageNumber => ({
    type: types.SET_OFFSET,
    payload: {offset: pageNumber}
})

export const setLimit = e => ({
    type: types.SET_LIMIT,
    payload: {limit: e.target.value}
})

export const getCoins = criteria => dispatch => {
    return fetch('/coins/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({criteria})
    })
        .then(res => res.json())
        .then(({coins, count, message, notfound}) => {
            if (notfound) {
                dispatch(notify(message));
            }
            dispatch(setList({coins, count}));
        })
}