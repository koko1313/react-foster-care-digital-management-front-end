import { AlertActionTypes, IAlert, SET_ALERT, REMOVE_ALERT } from "./types"

const initState = {
    title: "",
    message: "",
}

export const alertReducer = (state = initState, action: AlertActionTypes): IAlert => {
    switch (action.type) {
        case SET_ALERT: {
            return {...action.payload};
        }
        case REMOVE_ALERT: {
            return initState;
        }
        default: return state;
    }
}