import React from 'react';
import networkClient from '../../network/network-client';

const UsersListPage = () => {

    const renderUsersList = () => {
        networkClient.get('/user/all', null, (users) => {
            // TODO
            console.log(users);
        });
    }

    return (
        <>
            <h1>Потребители</h1>
            {renderUsersList()}
        </>
    );

}

export default UsersListPage;