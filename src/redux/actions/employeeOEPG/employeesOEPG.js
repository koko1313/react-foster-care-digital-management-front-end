import types from '../../action-types';
import networkClient from '../../../network/network-client';

function setEmployeesOEPGLoading() {
    return {type: types.SET_EMPLOYEES_OEPG_LOADING};
}

function removeEmployeesOEPGLoading() {
    return {type: types.REMOVE_EMPLOYEES_OEPG_LOADING};
}


export function loadEmployeesOEPG() {
    return (dispatch, getState) => {
        const { employeesOEPG } = getState();

        // if emploeesOEPG are already loaded
        if (employeesOEPG.length !== 0) {
            return;
        }

        dispatch(setEmployeesOEPGLoading());

        return networkClient.get('/employee-oepg/all', null, 
            (emploeesOEPG) => {
                if(emploeesOEPG.length === 0) return; // return null when there are no emploeesOEPG in database, otherwise it will cause infinite loop
                dispatch(setEmployeesOEPGInRedux(emploeesOEPG));
            }
        ).finally(() => {
            dispatch(removeEmployeesOEPGLoading());
        });
    };
}

export function setEmployeesOEPGInRedux (employees) {
    return {type: types.SET_EMPLOYEES_OEPG, payload: employees};
}


export function addEmployeeOEPG(employee) {
    return (dispatch) => {
        dispatch(setEmployeesOEPGLoading());

        return networkClient.post("/employee-oepg/register", employee,
            (registeredEmployee) => {
                dispatch(addEmployeeOEPGInRedux(registeredEmployee));
            }
        )
        .finally(() => {
            dispatch(removeEmployeesOEPGLoading());
        });
    }
}

export function addEmployeeOEPGInRedux(employee) {
    return {type: types.ADD_EMPLOYEE_OEPG, payload: employee};
}


export function updateEmployeeOEPG(id, updatedEmployee) {
    return (dispatch) => {
        dispatch(setEmployeesOEPGLoading());
        
        return networkClient.put(`/employee-oepg/update/${id}`, updatedEmployee,
            (updatedEmployee) => {
                dispatch(updateEmployeeOEPGInRedux(id, updatedEmployee));
            }
        ).then(() => {
            dispatch(removeEmployeesOEPGLoading());
        });
    };
}

export function updateEmployeeOEPGInRedux(id, updatedEmployee) {
    return {type: types.UPDATE_EMPLOYEE_OEPG, id: id, updatedEmployee: updatedEmployee}
}


export function deleteEmployeeOEPG(id) {
    return (dispatch) => {
        dispatch(setEmployeesOEPGLoading());
        
        return networkClient.delete(`/employee-oepg/delete/${id}`, null, 
            () => { 
                dispatch(deleteEmployeeOEPGFromReducer(id));
            }
        ).finally(() => {
            dispatch(removeEmployeesOEPGLoading());
        });
    }
}

export function deleteEmployeeOEPGFromReducer(id) {
    return {type: types.DELETE_EMPLOYEE_OEPG, payload: id};
}