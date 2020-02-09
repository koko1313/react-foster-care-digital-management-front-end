import types from '../action-types';

export function setFamilies (families) {
    return {type: types.SET_FAMILIES, payload: families};
}

export function deleteFamily(id) {
    return {type: types.DELETE_FAMILY, payload: id};
}