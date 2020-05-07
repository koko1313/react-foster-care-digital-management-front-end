import types from "../../action-types";

export function childrenIsLoading(state = false, action) {
    switch(action.type) {
        case types.SET_CHILDREN_LOADING: {
            return true;
        }
        case types.REMOVE_CHILDREN_LOADING: {
            return false;
        }

        default: return state;
    }
}

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
                if(child.family && child.family.id === action.id) {
                    child.family = action.updatedFamily;
                }
            });

            return state;
        }

        case types.ADD_CHILD_TO_CURRENT_FAMILY: {
            const addedChild = action.payload;

            state.forEach((child) => {
                if(child.id === addedChild.id) {
                    child.family = addedChild.family;
                }
            });

            return state;
        }

        case types.REMOVE_CHILD_FROM_CURRENT_FAMILY: {
            const removedChild = action.payload;

            state.forEach((child) => {
                if(child.id === removedChild.id) {
                    child.family = null;
                }
            });

            return state;
        }

        default: return state;
    }
}