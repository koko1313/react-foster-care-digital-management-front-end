import types from '../../action-types';

export function setChildren (children) {
    return {type: types.SET_CHILDREN, payload: children};
}

export function addChild (child) {
    return {type: types.ADD_CHILD, payload: child};
}

export function updateChild (id, child) {
    return {type: types.UPDATE_CHILD, id: id, child: child};
}

export function deleteChild(id) {
    return {type: types.DELETE_CHILD, payload: id};
}