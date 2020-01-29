import {combineReducers} from "redux";
import types from "./action-types";

function loggedUser(state = {}, action) {
    switch (action.type) {
        case types.SET_LOGGED_USER: {
            return {...action.payload};
        }
        default: return state;
    }
}

function children(state = [], action) {
    switch (action.type) {
        case types.SET_CHILDREN: {
            return [...action.payload];
        }
        default: return state;
    }
}

export default combineReducers({loggedUser, children});