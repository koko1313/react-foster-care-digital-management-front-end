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

function families(state = [], action) {
    switch(action.type) {
        case types.SET_FAMILIES: {
            return [...action.payload];
        }
        case types.DELETE_FAMILY: {
            return state.filter(item => item.id !== action.payload);
        }
        default: return state;
    }
}

export default combineReducers({loggedUser, children, users, families});