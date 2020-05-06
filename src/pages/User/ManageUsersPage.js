import React from 'react';
import { useHistory } from 'react-router-dom';

const ManageUsersPage = () => {

    const history = useHistory();

    return <>
        <div className="row">
            <div className="col content-container">
                <button className="btn btn-link" onClick={() => history.push("/employee-oepg/all")}>Потребители Областен екип приемна грижа (ОЕПГ)</button>
            </div>
        </div>
    </>;
}

export default ManageUsersPage;