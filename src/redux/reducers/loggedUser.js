import types from "../action-types";

export function loggedUser(state = {}, action) {
    switch (action.type) {
        case types.SET_LOGGED_USER: {
            return {...action.payload};
        }
        default: return state;
    }
}