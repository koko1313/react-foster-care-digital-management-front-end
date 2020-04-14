import types from "../../action-types";

export function currentChild(state = {}, action) {
    switch(action.type) {
        case types.SET_CURRENT_CHILD: {
            return {...action.payload};
        }
        default: return state;
    }
}