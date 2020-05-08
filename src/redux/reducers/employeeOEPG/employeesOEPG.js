import types from "../../action-types";

export function employeesOEPGAreLoading(state = false, action) {
    switch(action.type) {
        case types.SET_EMPLOYEES_OEPG_LOADING: {
            return true;
        }
        case types.REMOVE_EMPLOYEES_OEPG_LOADING: {
            return false;
        }

        default: return state;
    }
}

export function employeesOEPG(state = [], action) {
    switch(action.type) {
        case types.SET_EMPLOYEES_OEPG: {
            return [...action.payload];
        }
        case types.ADD_EMPLOYEE_OEPG: {
            state.push(action.payload);
            return state;
        }
        case types.UPDATE_EMPLOYEE_OEPG: {
            const employeeIndex = state.findIndex(employee => employee.id === action.id);
            state[employeeIndex] = action.updatedEmployee;
            return state;
        }
        case types.DELETE_EMPLOYEE_OEPG: {
            return state.filter(item => item.id !== action.payload);
        }
        default: return state;
    }
}