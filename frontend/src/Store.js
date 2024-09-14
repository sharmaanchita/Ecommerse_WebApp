import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer } from "./Reducers/productReducer";

const reducer = combineReducers({
    products:productReducer,
});

let initialState ={
    products: [],
    productCount: 0,
    loading: false,
    error: null,
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
