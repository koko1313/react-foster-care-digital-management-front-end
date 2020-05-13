import { LoggedUserActionTypes, ILoggedUser, SET_LOGGED_USER, REMOVE_LOGGED_USER } from "./types";

export const loggedUserReducer = (state = {}, action: LoggedUserActionTypes): ILoggedUser|object => {
    switch (action.type) {
        case SET_LOGGED_USER: {
            return {...action.payload};
        }
        case REMOVE_LOGGED_USER: {
            return {};
        }
        default: return state;
    }
}