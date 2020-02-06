import types from './action-types';
import networkClient from '../network/network-client';

export function setError (error) {
    return { type: types.SET_ERROR, payload: error };
}

export function setLoading(isLoading) {
    return {type: types.LOADING, payload: isLoading}
}

// #######################

export function setLoggedUser (user) {
    return {type: types.SET_LOGGED_USER, payload: user};
}

// #######################

export function setChildren (children) {
    return {type: types.SET_CHILDREN, payload: children};
}

export const getChildren = () => async dispatch => {
    try {
        const res = await networkClient.get("/children");
        dispatch(setChildren(res));
    } catch(ex) {
        dispatch(setError({message: 'There was an error!'}));
    }
};

// #######################

export function setUsers (users) {
    return {type: types.SET_USERS, payload: users};
}

export function deleteUser(id) {
    return {type: types.DELETE_USER, payload: id};
}

// #######################

export function setFamilies (families) {
    return {type: types.SET_FAMILIES, payload: families};
}

export function deleteFamily(id) {
    return {type: types.DELETE_FAMILY, payload: id};
}

// #######################

export function setLoadingPositions(isLoading) {
    return {type: types.LOADING_POSITIONS, payload: isLoading}
}

export function setLoadingRegions(isLoading) {
    return {type: types.LOADING_REGIONS, payload: isLoading}
}

export function setLoadingSubRegions(isLoading) {
    return {type: types.LOADING_SUB_REGIONS, payload: isLoading}
}

export function setLoadingCities(isLoading) {
    return {type: types.LOADING_CITIES, payload: isLoading}
}

// #######################