import types from "../../action-types";

export function families(state = [], action) {
    switch(action.type) {
        case types.SET_FAMILIES: {
            return [...action.payload];
        }
        case types.ADD_FAMILY: {
            state.push(action.payload);
            return state;
        }
        case types.UPDATE_FAMILY: {
            const familyIndex = state.findIndex(family => family.id === action.id);
            state[familyIndex] = action.updatedFamily;
            return state;
        }
        case types.DELETE_FAMILY: {
            return state.filter(item => item.id !== action.payload);
        }
        default: return state;
    }
}