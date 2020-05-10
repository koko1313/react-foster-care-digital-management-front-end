import types from '../../action-types';
import networkClient from '../../../network/network-client';
import actions from '..';

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
                dispatch(setFamiliesInRedux(families));
            }
        ).finally(() => {
            dispatch(removeFamiliesLoading());
        });
    };
}

export function setFamiliesInRedux(families) {
    return {type: types.SET_FAMILIES, payload: families};
}


export function addFamily(family) {
    return (dispatch) => {
        dispatch(setFamiliesLoading());

        return networkClient.post("/family/register", family,
            (registeredFamily) => {
                dispatch(addFamilyInRedux(registeredFamily));
            }
        ).finally(() => {
            dispatch(removeFamiliesLoading());
        });
    };
}

export function addFamilyInRedux(family) {
    return {type: types.ADD_FAMILY, payload: family};
}


export function updateFamily(id, updatedFamily) {
    return (dispatch) => {
        dispatch(setFamiliesLoading());

        return networkClient.put(`/family/update/${id}`, updatedFamily,
            (updatedFamily) => {
                dispatch(updateFamilyInRedux(id, updatedFamily));
                dispatch(actions.setCurrentFamilyInRedux(updatedFamily)); // update the current child too
            }
        ).finally(() => {
            dispatch(removeFamiliesLoading());
        });
    };
}

export function updateFamilyInRedux(id, updatedFamily) {
    return {type: types.UPDATE_FAMILY, id: id, updatedFamily: updatedFamily};
}


export function deleteFamily(id) {
    return (dispatch) => {
        dispatch(setFamiliesLoading());
        
        return networkClient.delete(`/family/delete/${id}`, null, 
            () => { 
                dispatch(deleteFamilyFromReducer(id));
            }
        ).finally(() => {
            dispatch(removeFamiliesLoading());
        });
    }
}

export function deleteFamilyFromReducer(id) {
    return {type: types.DELETE_FAMILY, payload: id};
}