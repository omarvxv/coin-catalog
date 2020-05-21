import * as types from "../constants";

export const clearCriteria = () => ({
    type: types.CLEAR_CRITERIA
})

export const setGroup = id => ({
    type: types.SET_GROUP,
    payload: {id}
})

export const setCriteria = searchCriteria => ({
    type: types.SET_SEARCH_CRITERIA,
    payload: {searchCriteria}
})

const setSearchLine = (data) => ({
    type: types.SET_SEARCH_LINE,
    payload: {...data}
})

export const getCriteria = () => dispatch => {
    return fetch('http://localhost:3001/getCriteria/')
        .then(res => res.json())
        .then(({data}) => {
            for (let criteria in data) {
                if (data.hasOwnProperty(criteria)) {
                    data[criteria].unshift('')
                }
            }
            dispatch(setSearchLine(data));
        })
}