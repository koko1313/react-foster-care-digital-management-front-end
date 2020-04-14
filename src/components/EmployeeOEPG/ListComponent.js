import React, { useEffect, useState } from 'react';
import networkClient from '../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const users = useSelector(state => state.employeesOEPG);

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
        if(users.length === 0) {
            setIsLoading(true);

            networkClient.get('/employee-oepg/all', null, 
                (users) => {
                    dispatch(actions.setEmployeesOEPG(users));
                    setIsLoading(false);
                },
                (error) => {
                    processErrorMessages(error);
                    setIsLoading(false);
                }
            );
        }
    
        // eslint-disable-next-line
    }, [users]);

    const editUser = (id) => {
        history.push(`/employee-oepg/edit/${id}`);
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
        if(!users) return null;

        return users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{`${user.first_name} ${user.second_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>
                        {user.city ? user.city.name + ", " : null}
                        {user.sub_region ? user.sub_region.name + ", " : null}
                        {user.region ? user.region.name : null}
                    </td>
                    <td>
                        <button type="button" className="btn btn-warning mr-1 mb-1" onClick={() => { editUser(user.id) }}><i className="fa fa-edit"></i></button>
                        <button type="button" className="btn btn-danger mb-1" onClick={() => { deleteUser(user.id) }}><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            );
        });
    }

    const remountComponent = () => {
        dispatch(actions.setEmployeesOEPG([]));
    }

    return (
        <>
            <button className="btn btn-link" onClick={()=>history.push("/employee-oepg/register")}>Регистрация на потребител</button>
            <button className="btn btn-info pull-right mb-2" onClick={remountComponent}><i className="fa fa-refresh"></i></button>
            
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

            <Loader loading={isLoading} />
        </>
    );

}

export default ListComponent;