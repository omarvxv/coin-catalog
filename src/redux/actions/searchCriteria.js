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

const setSearchLine = (data) => ({ // запись критериев для выпадающих списков
    type: types.SET_SEARCH_LINE,   // в поле Advanced filter
    payload: {...data}
})

export const getCriteria = () => dispatch => {
    return fetch('/criteria/')
        .then(res => res.json())
        .then(({data}) => {
            for (let criteria in data) {
                if (data.hasOwnProperty(criteria)) {
                    data[criteria].unshift('') // для того чтобы можно было обнулять
                }                                     // критерию поиска в выпадающих списках
            }
            dispatch(setSearchLine(data));
        })
}