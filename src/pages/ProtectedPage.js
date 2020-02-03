import React from 'react';
import networkClient from '../network/network-client';

const ProtectedPage = () => {

    const doTestQuery = () => {
        networkClient.post("/protected-test");
        return null;
    }

    return (
        doTestQuery()
    );

}

export default ProtectedPage;