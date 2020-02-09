import types from '../action-types';

export function setAlert(alert) {
    return {type: types.SET_ALERT, payload: alert};
}

export function removeAlert() {
    return {type: types.REMOVE_ALERT}
}