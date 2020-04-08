import types from '../action-types';

export function setChildren (children) {
    return {type: types.SET_CHILDREN, payload: children};
}

export function deleteChild(id) {
    return {type: types.DELETE_CHILD, payload: id};
}