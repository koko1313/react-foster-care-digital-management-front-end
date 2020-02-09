import types from "../action-types";

const initState = {
    title: "",
    message: "",
}

export function alert(state = initState, action) {
    switch (action.type) {
        case types.SET_ALERT: {
            return {...action.payload};
        }
        case types.REMOVE_ALERT: {
            return {};
        }
        default: return state;
    }
}