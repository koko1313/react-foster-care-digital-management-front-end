import types from "../../action-types";
import { objectIsEmpty } from '../../../helpers';

export function currentFamilyIsLoading(state = false, action) {
    switch(action.type) {
        case types.SET_CURRENT_FAMILY_LOADING: {
            return true;
        }
        case types.REMOVE_CURRENT_FAMILY_LOADING: {
            return false;
        }

        default: return state;
    }
}

export function currentFamily(state = {}, action) {
    switch(action.type) {
        case types.SET_CURRENT_FAMILY: {
            return {...action.payload};
        }
        case types.ADD_CHILD_TO_CURRENT_FAMILY: {
            state.children.push(action.payload);
            return state; 
        }
        case types.REMOVE_CHILD_FROM_CURRENT_FAMILY: {
            state.children = state.children.filter(item => item.id !== action.payload.id);
            return state;
        }

        // when update child, update it in the family's array of children
        case types.UPDATE_CHILD: {
            if(objectIsEmpty(state)) return state;

            const updatedChild = action.updatedChild;

            // if updated child has no family, return the state with removed child
            if(!updatedChild.family) {
                state.children = state.children.filter(child => child.id !== action.id);
                return state;
            } 

            // if the current family id is different than updated child family id
            if(state.id !== updatedChild.family.id) {
                state.children = state.children.filter(child => child.id !== action.id); // remove the child
            }

            return state;
        }

        default: return state;
    }
}