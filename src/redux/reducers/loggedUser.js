import types from "../action-types";

export function loggedUser(state = {}, action) {
    switch (action.type) {
        case types.SET_LOGGED_USER: {
            return {...action.payload};
        }
        case types.DELETE_LOGGED_USER: {
            return {};
        }
        default: return state;
    }
}