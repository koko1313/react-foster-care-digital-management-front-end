import types from "../action-types";

export function currentFamily(state = {}, action) {
    switch(action.type) {
        case types.SET_CURRENT_FAMILY: {
            return {...action.payload};
        }
        case types.ADD_CHILD_TO_CURRENT_FAMILY: {
            state.children.push(action.payload);
            return state; 
        }
        default: return state;
    }
}