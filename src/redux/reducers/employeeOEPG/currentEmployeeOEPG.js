import types from "../../action-types";

export function currentEmployeeOEPG(state = {}, action) {
    switch(action.type) {
        case types.SET_CURRENT_EMPLOYEE_OEPG: {
            return {...action.payload};
        }
        default: return state;
    }
}