import types from '../action-types';

export function setCurrentFamily (family) {
    return {type: types.SET_CURRENT_FAMILY, payload: family};
}

export function addChildToCurrentFamily (child) {
    return {type: types.ADD_CHILD_TO_CURRENT_FAMILY, payload: child};
}