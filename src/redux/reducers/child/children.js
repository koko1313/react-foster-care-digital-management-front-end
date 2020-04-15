import types from "../../action-types";

export function children(state = [], action) {
    switch(action.type) {
        case types.SET_CHILDREN: {
            return [...action.payload];
        }
        case types.ADD_CHILD: {
            state.push(action.payload);
            return state;
        }
        case types.UPDATE_CHILD: {
            const childIndex = state.findIndex(child => child.id === action.id);
            state[childIndex] = action.updatedChild;
            return state;
        }
        case types.DELETE_CHILD: {
            return state.filter(item => item.id !== action.payload);
        }

        // when update family, update it in the children details
        case types.UPDATE_FAMILY: {
            state.forEach((child) => {
                if(child.family.id === action.id) {
                    child.family = action.updatedFamily;
                }
            });

            return state;
        }

        default: return state;
    }
}