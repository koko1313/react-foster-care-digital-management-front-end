import { ILoggedUser, LoggedUserActionTypes, SET_LOGGED_USER, REMOVE_LOGGED_USER } from "./types";


export const setLoggedUser = (loggedUser: ILoggedUser): LoggedUserActionTypes => {
    return {type: SET_LOGGED_USER, payload: loggedUser};
}

export const removeLoggedUser = (): LoggedUserActionTypes => {
    return {type: REMOVE_LOGGED_USER};
}