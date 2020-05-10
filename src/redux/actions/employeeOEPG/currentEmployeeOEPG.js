import types from '../../action-types';
import networkClient from '../../../network/network-client';

export function loadCurrentEmployeeOEPG(id) {
    return (dispatch) => {
        return networkClient.get(`/employee-oepg/${id}`, null, 
            (employeeOEPG) => {
                dispatch(setCurrentEmployeeOEPGInRedux(employeeOEPG));
            }
        );
    }
}

export function setCurrentEmployeeOEPGInRedux(employee) {
    return {type: types.SET_CURRENT_EMPLOYEE_OEPG, payload: employee};
}