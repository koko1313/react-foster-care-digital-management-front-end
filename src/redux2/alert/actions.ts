import { IAlert, AlertActionTypes, SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (alert: IAlert): AlertActionTypes => {
    return {type: SET_ALERT, payload: alert};
}

export const removeAlert = (): AlertActionTypes => {
    return {type: REMOVE_ALERT};
}