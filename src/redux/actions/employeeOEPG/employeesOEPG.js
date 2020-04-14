import types from '../../action-types';

export function setEmployeesOEPG (employees) {
    return {type: types.SET_EMPLOYEES_OEPG, payload: employees};
}

export function addEmployeeOEPG(employee) {
    return {type: types.ADD_EMPLOYEE_OEPG, payload: employee};
}

export function updateEmployeeOEPG(id, updatedEmployee) {
    return {type: types.UPDATE_EMPLOYEE_OEPG, id: id, updatedEmployee: updatedEmployee}
}

export function deleteEmployeeOEPG(id) {
    return {type: types.DELETE_EMPLOYEE_OEPG, payload: id};
}