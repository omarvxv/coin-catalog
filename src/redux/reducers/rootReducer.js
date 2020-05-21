import { combineReducers } from "redux";
import { coinList } from "./coinList";
import { coin } from "./coin";
import { auth } from "./auth";
import { searchCriteria } from "./searchCriteria";
import { notification } from "./notification";

export const rootReducer = combineReducers({ coinList, coin, auth, searchCriteria, notification });