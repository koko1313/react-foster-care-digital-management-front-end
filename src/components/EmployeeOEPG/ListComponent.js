import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const employeesOEPGAreLoading = useSelector(state => state.employeesOEPGAreLoading);
    const employeesOEPG = useSelector(state => state.employeesOEPG);

    const processErrorMessages = (error) => {
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

    useEffect(()=> {
        const loaded = dispatch(actions.loadEmployeesOEPG());
        if(loaded) {
            loaded.catch(error => processErrorMessages(error));
        }

        // eslint-disable-next-line
    }, [employeesOEPG, dispatch]);

    const editUser = (employeeOEPG) => {
        dispatch(actions.setCurrentEmployeeOEPGInRedux(employeeOEPG));
        history.push(`/employee-oepg/edit/${employeeOEPG.id}`);
    }

    const deleteUser = (employeeOEPG) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        dispatch(actions.deleteEmployeeOEPG(employeeOEPG.id))
            .catch(error => processErrorMessages(error));
    }

    const remountComponent = () => {
        dispatch(actions.setEmployeesOEPGInRedux([]));
    }
    
    const renderUsersList = () => {
        if(!employeesOEPG) return null;

        return employeesOEPG.map((employeeOEPG) => {
            return (
                <tr key={employeeOEPG.id}>
                    <td>{`${employeeOEPG.first_name} ${employeeOEPG.second_name} ${employeeOEPG.last_name}`}</td>
                    <td>{employeeOEPG.email}</td>
                    <td>
                        {employeeOEPG.city ? employeeOEPG.city.name + ", " : null}
                        {employeeOEPG.sub_region ? employeeOEPG.sub_region.name + ", " : null}
                        {employeeOEPG.region ? employeeOEPG.region.name : null}
                    </td>
                    <td>
                        <button type="button" className="btn btn-warning mr-1 mb-1" onClick={() => { editUser(employeeOEPG) }}><i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-danger mb-1" onClick={() => { deleteUser(employeeOEPG) }}><i className="fas fa-trash"></i></button>
                    </td>
                </tr>
            );
        });
    }

    return <>
        <div className="content-list d-flex flex-column">
            <div className="content-list-options d-flex justify-content-between">
                <button className="btn btn-link" onClick={()=>history.push("/employee-oepg/register")}>Регистрация на потребител</button>
                <button className="btn btn-info mb-2" onClick={remountComponent}><i className="fas fa-sync"></i></button>
            </div>

            <div className="content-list-results">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Име</th>
                                <th scope="col">Email</th>
                                <th scope="col">Адрес</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUsersList()}
                        </tbody>
                    </table>
                </div>
            </div>

            <Loader loading={employeesOEPGAreLoading} />
        </div>
    </>;

}

export default ListComponent;