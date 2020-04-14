import types from '../../action-types';

export function setCurrentEmployeeOEPG (employee) {
    return {type: types.SET_CURRENT_EMPLOYEE_OEPG, payload: employee};
}