import types from "../action-types";

export function cities(state = [], action) {
    switch(action.type) {
        case types.SET_CITIES: {
            return [...action.payload];
        }
        default: return state;
    }
}