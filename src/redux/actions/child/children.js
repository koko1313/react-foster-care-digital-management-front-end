import types from '../../action-types';
import networkClient from '../../../network/network-client';

function setChildrenLoading() {
    return {type: types.SET_CHILDREN_LOADING};
}

function removeChildrenLoading() {
    return {type: types.REMOVE_CHILDREN_LOADING};
}

export function loadChildren() {
    return (dispatch) => {
        dispatch(setChildrenLoading());

        return networkClient.get('/child/all', null, 
            (children) => {
                if(children.length === 0) return; // return null when there are no childrens in database, otherwise it will cause infinite loop
                dispatch(setChildren(children));
            }
        ).finally(() => {
            dispatch(removeChildrenLoading());
        });
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