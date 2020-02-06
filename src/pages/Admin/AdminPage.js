import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminPage = () => {

    let history = useHistory();

    return (
        <>
            <button className="btn btn-link" onClick={()=>history.push("/user/all")}>Потребители</button>
        </>
    );

}

export default AdminPage;