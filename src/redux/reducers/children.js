import types from "../action-types";

export function children(state = [], action) {
    switch (action.type) {
        case types.SET_CHILDREN: {
            return [...action.payload];
        }
        default: return state;
    }
}