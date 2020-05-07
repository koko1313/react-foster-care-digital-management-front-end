import types from '../../action-types';
import networkClient from '../../../network/network-client';
import actions from '..';

function setChildrenLoading() {
    return {type: types.SET_CHILDREN_LOADING};
}

function removeChildrenLoading() {
    return {type: types.REMOVE_CHILDREN_LOADING};
}

export function loadChildren() {
    return (dispatch, getState) => {
        const { children } = getState();
    
        // if children are already loaded
        if (children.length !== 0) {
            return;
        }

        dispatch(setChildrenLoading());

        networkClient.get('/child/all', null, 
            (children) => {
                dispatch(removeChildrenLoading());
                if(children.length === 0) return; // return null when there are no childrens in database, otherwise it will cause infinite loop
                dispatch(setChildren(children));
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
                dispatch(removeChildrenLoading());
            }
        );
    };
}

export function setChildren (children) {
    return {type: types.SET_CHILDREN, payload: children};
}

export function addChild (child) {
    return {type: types.ADD_CHILD, payload: child};
}

export function updateChild (id, updatedChild) {
    return {type: types.UPDATE_CHILD, id: id, updatedChild: updatedChild};
}

export function deleteChild(id) {
    return {type: types.DELETE_CHILD, payload: id};
}