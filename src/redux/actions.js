import types from './action-types';
//import networkClient from '../network/network-client';

export function setError (error) {
    return { type: types.SET_ERROR, payload: error };
}

// #######################

export function setLoggedUser (user) {
    return {type: types.SET_LOGGED_USER, payload: user};
}