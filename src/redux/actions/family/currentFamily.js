import types from '../../action-types';
import networkClient from '../../../network/network-client';

function setCurrentFamilyLoading() {
    return {type: types.SET_CURRENT_FAMILY_LOADING};
}

function removeCurrentFamilyLoading() {
    return {type: types.REMOVE_CURRENT_FAMILY_LOADING};
}


export function loadCurrentFamily(id) {
    return (dispatch) => {
        dispatch(setCurrentFamilyLoading());
        
        return networkClient.get(`/family/${id}`, null, 
            (family) => {
                dispatch(setCurrentFamilyInRedux(family));
            }
        ).finally(() => {
            dispatch(removeCurrentFamilyLoading());
        });
    }
}

export function setCurrentFamilyInRedux(family) {
    return {type: types.SET_CURRENT_FAMILY, payload: family};
}


export function addChildToCurrentFamily (child) {
    return {type: types.ADD_CHILD_TO_CURRENT_FAMILY, payload: child};
}

export function removeChildFromCurrentFamily (child) {
    return {type: types.REMOVE_CHILD_FROM_CURRENT_FAMILY, payload: child};
}