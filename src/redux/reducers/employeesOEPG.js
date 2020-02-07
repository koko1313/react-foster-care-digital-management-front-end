import types from "../action-types";

export function employeesOEPG(state = [], action) {
    switch(action.type) {
        case types.SET_EMPLOYEES_OEPG: {
            return [...action.payload];
        }
        case types.DELETE_EMPLOYEE_OEPG: {
            return state.filter(item => item.id !== action.payload);
        }
        default: return state;
    }
}