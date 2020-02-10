import types from "../action-types";

export function subRegions(state = [], action) {
    switch(action.type) {
        case types.SET_SUB_REGIONS: {
            return [...action.payload];
        }
        default: return state;
    }
}