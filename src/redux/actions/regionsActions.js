import types from '../action-types';

export function setRegions(regions) {
    return {type: types.SET_REGIONS, payload: regions};
}