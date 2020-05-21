import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const middleWare = [ thunk ];

if(process.env.NODE_ENV !== 'production'){
    middleWare.push(createLogger());
}

const store = createStore(
    rootReducer,
    applyMiddleware( ...middleWare )
)

export default store;