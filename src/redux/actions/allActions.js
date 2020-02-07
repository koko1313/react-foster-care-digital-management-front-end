import types from '../action-types';

export function setError (error) {
    return { type: types.SET_ERROR, payload: error };
}

// #######################

export function setLoggedUser (user) {
    return {type: types.SET_LOGGED_USER, payload: user};
}

// #######################

export function setFamilies (families) {
    return {type: types.SET_FAMILIES, payload: families};
}

export function deleteFamily(id) {
    return {type: types.DELETE_FAMILY, payload: id};
}

// #######################