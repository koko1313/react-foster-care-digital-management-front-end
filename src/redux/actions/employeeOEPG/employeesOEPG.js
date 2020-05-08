import types from '../../action-types';
import networkClient from '../../../network/network-client';
import actions from '..';

function processErrorMessages(error, dispatch) {
    if(error.response) {
        switch(error.response.status) {
            case 401:
                dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                dispatch(actions.deleteLoggedUser());
                break;
            default:
                dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                break;
        }
    } else {
        dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
    }
}

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

        networkClient.get('/employee-oepg/all', null, 
            (emploeesOEPG) => {
                dispatch(removeEmployeesOEPGLoading());
                if(emploeesOEPG.length === 0) return; // return null when there are no emploeesOEPG in database, otherwise it will cause infinite loop
                dispatch(setEmployeesOEPG(emploeesOEPG));
            },
            (error) => {
                processErrorMessages(error, dispatch);
                dispatch(removeEmployeesOEPGLoading());
            }
        );
    };
}

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
    return (dispatch) => {
        dispatch(setEmployeesOEPGLoading());
        
        networkClient.delete(`/employee-oepg/delete/${id}`, null, 
            () => { 
                dispatch(deleteEmployeeOEPGFromReducer(id));
                dispatch(removeEmployeesOEPGLoading());
            },
            (error) => {
                processErrorMessages(error, dispatch);
                dispatch(removeEmployeesOEPGLoading());
            }
        );
    }
}

export function deleteEmployeeOEPGFromReducer(id) {
    return {type: types.DELETE_EMPLOYEE_OEPG, payload: id};
}