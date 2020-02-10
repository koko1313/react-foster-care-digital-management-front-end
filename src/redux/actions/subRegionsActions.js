import types from '../action-types';

export function setSubRegions(subRegions) {
    return {type: types.SET_SUB_REGIONS, payload: subRegions};
}