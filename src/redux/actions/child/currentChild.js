import types from '../../action-types';

export function setCurrentChild (child) {
    return {type: types.SET_CURRENT_CHILD, payload: child};
}