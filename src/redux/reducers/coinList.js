import * as types from '../constants';

const initialList = {list: [], count: 1};

export const coinList = (state = initialList, action) => {
    switch(action.type){
        case types.SET_LIST:
            return {
                ...state,
                list: action.payload.coins,
                count: action.payload.count,
            }
        case types.CLEAR_LIST:
            return {
                ...state,
                list: []
            }
        case types.DELETE_COIN:
            return {
                ...state,
                list: state.list.filter(coin => coin.id !== action.payload.id)
            }
        case types.ADD_COIN:
            return {
                ...state,
                list: [...state.list, action.payload.coin]
            }
        case types.EDIT_COIN:
            return {
                ...state,
                list: state.list.map(coin => {
                    if(coin.id === action.payload.coin.id){
                        return action.payload.coin;
                    }
                    return coin;
                })
            }

        default:
            return state;
    }
}