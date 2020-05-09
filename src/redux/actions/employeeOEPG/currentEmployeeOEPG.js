import types from '../../action-types';
import networkClient from '../../../network/network-client';

function setCurrentEmployeeOEPGLoading() {
    return {type: types.SET_CURRENT_EMPLOYEE_OEPG_LOADING};
}

function removeCurrentEmployeeOEPGLoading() {
    return {type: types.REMOVE_CURRENT_EMPLOYEE_OEPG_LOADING};
}

export function loadCurrentEmployeeOEPG(id) {
    return (dispatch) => {
        dispatch(setCurrentEmployeeOEPGLoading());
        
        return networkClient.get(`/employee-oepg/${id}`, null, 
            (employeeOEPG) => {
                dispatch(setCurrentEmployeeOEPGInRedux(employeeOEPG));
            }
        ).finally(() => {
            dispatch(removeCurrentEmployeeOEPGLoading());
        });
    }
}

export function setCurrentEmployeeOEPGInRedux(employee) {
    return {type: types.SET_CURRENT_EMPLOYEE_OEPG, payload: employee};
}