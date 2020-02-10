import types from "../action-types";

export function regions(state = [], action) {
    switch(action.type) {
        case types.SET_REGIONS: {
            return [...action.payload];
        }
        default: return state;
    }
}