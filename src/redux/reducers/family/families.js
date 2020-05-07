import types from "../../action-types";

export function familiesIsLoading(state = false, action) {
    switch(action.type) {
        case types.SET_FAMILIES_LOADING: {
            return true;
        }
        case types.REMOVE_FAMILIES_LOADING: {
            return false;
        }

        default: return state;
    }
}

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

        // when add child, add it in the family's array of children too
        case types.ADD_CHILD: {
            if(state.length === 0) return state;

            const familyOfAddedChild = action.payload.family;

            if(!familyOfAddedChild) return state; // if added child has no family, do nothing

            const familyIndex = state.findIndex(family => family.id === familyOfAddedChild.id);

            state[familyIndex].children.push(action.payload);

            return state;
        }

        // when update child, update it in the family's array of children
        case types.UPDATE_CHILD: {
            if(state.length === 0) return state;

            state.forEach((family) => {
                family.children = family.children.filter(child => child.id !== action.id); // remove the child
            });

            if(!action.updatedChild.family) return state; // if updated child has no family, return the state with removed child

            const familyOfUpdatedChild = action.updatedChild.family;

            const familyIndex = state.findIndex(family => family.id === familyOfUpdatedChild.id); // find family index (in state array)
            
            state[familyIndex].children.push(action.updatedChild);


            return state;
        }

        // when delete child, delete it from the family's array of children too
        case types.DELETE_CHILD: {
            const idOfDeletedChild = action.payload;

            state.forEach((family) => {
                family.children = family.children.filter(child => child.id !== idOfDeletedChild);
            });

            return state;
        }

        case types.REMOVE_CHILD_FROM_CURRENT_FAMILY: {
            const removedChild = action.payload;

            state.forEach((family) => {
                family.children = family.children.filter(child => child.id !== removedChild.id);
            })

            return state;
        }

        default: return state;
    }
}