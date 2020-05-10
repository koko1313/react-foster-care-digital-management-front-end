import types from '../../action-types';
import networkClient from '../../../network/network-client';

function setFamiliesLoading() {
    return {type: types.SET_FAMILIES_LOADING};
}

function removeFamiliesLoading() {
    return {type: types.REMOVE_FAMILIES_LOADING};
}

export function loadFamilies() {
    return (dispatch) => {
        dispatch(setFamiliesLoading());

        return networkClient.get('/family/all', null, 
            (families) => {
                if(families.length === 0) return; // return null when there are no families in database, otherwise it will cause infinite loop
                dispatch(setFamilies(families));
            }
        ).finally(() => {
            dispatch(removeFamiliesLoading());
        });
    };
}

export function setFamilies (families) {
    return {type: types.SET_FAMILIES, payload: families};
}

export function addFamily (family) {
    return {type: types.ADD_FAMILY, payload: family};
}

export function updateFamily (id, updatedFamily) {
    return {type: types.UPDATE_FAMILY, id: id, updatedFamily: updatedFamily};
}

export function deleteFamily(id) {
    return {type: types.DELETE_FAMILY, payload: id};
}