import React, { useEffect } from 'react';
import networkClient from '../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../redux/actions";
import Loader from '../../components/base-components/Loader';
import { useHistory } from 'react-router-dom';

const UserListComponent = () => {

    const isLoading = useSelector(state => state.loading);
    const users = useSelector(state => state.users);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(actions.setLoading(true));
        
        networkClient.get('/user/all', null, (users) => {
            dispatch(actions.setUsers(users));
        })
        .finally(() => {
            dispatch(actions.setLoading(false));
        });
    }, []);

    const editUser = (id) => {
        history.push(`/user/edit/${id}`);
    }

    const deleteUser = (id) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        dispatch(actions.setLoading(true));
        
        networkClient.delete(`/user/delete/${id}`, null, 
        // success
        () => { dispatch(actions.deleteUser(id)) },
        // error
        () => { console.log("err") })
        // finally
        .finally(() => { 
            dispatch(actions.setLoading(false)) 
        });
    }
    
    const renderUsersList = () => {
        if(!users) return null;

        return users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{`${user.first_name} ${user.second_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.position ? user.position.name : null}</td>
                    <td>
                        {user.city ? user.city.name + ", " : null}
                        {user.sub_region ? user.sub_region.name + ", " : null}
                        {user.region ? user.region.name : null}
                    </td>
                    <td>
                        <button type="button" className="btn btn-warning mr-1" onClick={() => { editUser(user.id) }}><i className="fa fa-edit"></i></button>
                        <button type="button" className="btn btn-danger" onClick={() => { deleteUser(user.id) }}><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <button className="btn btn-link" onClick={()=>history.push("/user/register")}>Регистрация на потребител</button>
            
            <div class="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Име</th>
                            <th scope="col">Email</th>
                            <th scope="col">Позиция</th>
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

export default UserListComponent;