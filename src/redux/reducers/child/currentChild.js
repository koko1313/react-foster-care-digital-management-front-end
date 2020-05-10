import types from "../../action-types";
import { objectIsEmpty } from '../../../helpers';

export function currentChild(state = {}, action) {
    switch(action.type) {
        case types.SET_CURRENT_CHILD: {
            return {...action.payload};
        }

        // when update family, update it in the child's details
        case types.UPDATE_FAMILY: {
            if(objectIsEmpty(state)) return state;
            return {...action.payload}
        }

        default: return state;
    }
}