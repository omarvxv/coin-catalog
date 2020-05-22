import * as types from '../constants';

const initialState = {countries: [], qualities: [], compositions: [], searchCriteria: {}, limit: 4, offset: 0};

export function searchCriteria(state = initialState, action){
    switch(action.type){
        case types.SET_SEARCH_LINE:
            return{ // запись критериев для поиска в выпадающие списки Advanced filter
                ...state,
                ...action.payload
            }
        case types.SET_SEARCH_CRITERIA:
            return {
                ...state,
                searchCriteria: {
                    ...state.searchCriteria,
                    ...action.payload.searchCriteria,
                },
                group: '',
            }
        case types.SET_OFFSET:
            return{
                ...state,
                searchCriteria: {
                    ...state.searchCriteria,
                },
                offset: (action.payload.offset) * state.limit
            }
        case types.SET_LIMIT:
            return{
                ...state,
                searchCriteria: {
                    ...state.searchCriteria,
                },
                limit: action.payload.limit
            }
        case types.CLEAR_CRITERIA:
            return {
                ...state,
                limit: state.searchCriteria.limit,
                offset: state.searchCriteria.offset
            }
        case types.SET_GROUP:
            return {
                ...state,
                group: action.payload.id,
            }
        default:
            return state;
    }
}