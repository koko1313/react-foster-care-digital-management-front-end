import React, { useEffect, useState } from 'react';
import networkClient from '../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const employees = useSelector(state => state.employeesOEPG);

    const history = useHistory();
    const dispatch = useDispatch();

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
        if(employees.length === 0) {
            setIsLoading(true);

            networkClient.get('/employee-oepg/all', null, 
                (employees) => {
                    dispatch(actions.setEmployeesOEPG(employees));
                    setIsLoading(false);
                },
                (error) => {
                    processErrorMessages(error);
                    setIsLoading(false);
                }
            );
        }
    
        // eslint-disable-next-line
    }, [employees]);

    const editUser = (employee) => {
        dispatch(actions.setCurrentEmployeeOEPG(employee));
        history.push(`/employee-oepg/edit`);
    }

    const deleteUser = (id) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        setIsLoading(true);
        
        networkClient.delete(`/employee-oepg/delete/${id}`, null, 
            () => { 
                dispatch(actions.deleteEmployeeOEPG(id));
                setIsLoading(false);
            },
            (error) => {
                processErrorMessages(error);
                setIsLoading(false);
            }
        );
    }
    
    const renderUsersList = () => {
        if(!employees) return null;

        return employees.map((employee) => {
            return (
                <tr key={employee.id}>
                    <td>{`${employee.first_name} ${employee.second_name} ${employee.last_name}`}</td>
                    <td>{employee.email}</td>
                    <td>
                        {employee.city ? employee.city.name + ", " : null}
                        {employee.sub_region ? employee.sub_region.name + ", " : null}
                        {employee.region ? employee.region.name : null}
                    </td>
                    <td>
                        <button type="button" className="btn btn-warning mr-1 mb-1" onClick={() => { editUser(employee) }}><i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-danger mb-1" onClick={() => { deleteUser(employee.id) }}><i className="fas fa-trash"></i></button>
                    </td>
                </tr>
            );
        });
    }

    const remountComponent = () => {
        dispatch(actions.setEmployeesOEPG([]));
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

            <Loader loading={isLoading} />
        </div>
    </>;

}

export default ListComponent;