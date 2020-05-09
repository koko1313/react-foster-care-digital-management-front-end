import types from "../../action-types";

export function currentEmployeeOEPGIsLoading(state = false, action) {
    switch(action.type) {
        case types.SET_CURRENT_EMPLOYEE_OEPG_LOADING: {
            return true;
        }
        case types.REMOVE_CURRENT_EMPLOYEE_OEPG_LOADING: {
            return false;
        }

        default: return state;
    }
}

export function currentEmployeeOEPG(state = {}, action) {
    switch(action.type) {
        case types.SET_CURRENT_EMPLOYEE_OEPG: {
            return {...action.payload};
        }
        default: return state;
    }
}