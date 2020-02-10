import types from '../action-types';

export function setCities(cities) {
    return {type: types.SET_CITIES, payload: cities};
}