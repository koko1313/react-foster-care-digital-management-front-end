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
    return (dispatch, getState) => {
        const { families } = getState();
    
        // if families are already loaded
        if (families.length !== 0) {
            return;
        }

        dispatch(setFamiliesLoading());

        networkClient.get('/family/all', null, 
            (families) => {
                dispatch(removeFamiliesLoading());
                if(families.length === 0) return; // return null when there are no families in database, otherwise it will cause infinite loop
                dispatch(setFamilies(families));
            },
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 401:
                            dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                            dispatch(actions.deleteLoggedUser());
                            break;
                        default:
                            dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                            break;
                    }
                } else {
                    dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
                }
                dispatch(removeFamiliesLoading());
            }
        );
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