import React, { useEffect, useState } from 'react';
import networkClient from '../../network/network-client';

const UsersListPage = () => {

    const [users, setUsers] = useState();

    useEffect(()=> {
        networkClient.get('/user/all', null, (users) => {
            setUsers(users);
        });
    }, []);
    
    const renderUsersList = () => {
        if(!users) return null;

        return users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{`${user.firstName} ${user.secondName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                </tr>
            );
        });
    }

    return (
        <>
            <h1>Потребители</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Име</th>
                        <th scope="col">Email</th>
                        <th scope="col">Пол</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsersList()}
                </tbody>
            </table>
        </>
    );

}

export default UsersListPage;