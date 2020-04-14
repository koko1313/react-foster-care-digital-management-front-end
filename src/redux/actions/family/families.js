import types from '../../action-types';

export function setFamilies (families) {
    return {type: types.SET_FAMILIES, payload: families};
}

export function addFamily (family) {
    return {type: types.ADD_FAMILY, payload: family};
}

export function updateFamily (id, family) {
    return {type: types.UPDATE_FAMILY, id: id, family: family};
}

export function deleteFamily(id) {
    return {type: types.DELETE_FAMILY, payload: id};
}