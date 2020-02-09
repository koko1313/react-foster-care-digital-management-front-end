import types from '../action-types';

export function setError (error) {
    return { type: types.SET_ERROR, payload: error };
}