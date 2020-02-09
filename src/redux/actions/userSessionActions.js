import types from '../action-types';

export function setLoggedUser(user) {
    return {type: types.SET_LOGGED_USER, payload: user};
}

export function deleteLoggedUser() {
    return {type: types.DELETE_LOGGED_USER}
}