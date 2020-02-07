import React from 'react';
import { useHistory } from 'react-router-dom';

const ManageUsersPage = () => {

    const history = useHistory();

    return (
        <>
            <button className="btn btn-link" onClick={() => history.push("/employee-oepg/all")}>Потребители ОЕПГ</button>
        </>
    );

}

export default ManageUsersPage;