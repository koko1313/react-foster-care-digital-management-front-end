import {combineReducers} from "redux";
import types from "./action-types";

export function loading(state = false, action) {
    switch(action.type) {
        case types.LOADING: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

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

function users(state = [], action) {
    switch(action.type) {
        case types.SET_USERS: {
            return [...action.payload];
        }
        case types.DELETE_USER: {
            return state.filter(item => item.id !== action.payload);
        }
        default: return state;
    }
}

export default combineReducers({loading, loggedUser, children, users});