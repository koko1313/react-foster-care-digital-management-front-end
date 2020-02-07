import types from '../action-types';

export function setEmployeesOEPG (users) {
    return {type: types.SET_EMPLOYEES_OEPG, payload: users};
}

export function deleteEmployeeOEPG(id) {
    return {type: types.DELETE_EMPLOYEE_OEPG, payload: id};
}