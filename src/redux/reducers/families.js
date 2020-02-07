import types from "../action-types";

export function families(state = [], action) {
    switch(action.type) {
        case types.SET_FAMILIES: {
            return [...action.payload];
        }
        case types.DELETE_FAMILY: {
            return state.filter(item => item.id !== action.payload);
        }
        default: return state;
    }
}