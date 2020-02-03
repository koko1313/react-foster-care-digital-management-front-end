import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminPage = () => {

    let history = useHistory();

    const goTo = (path) => {
        history.push(path);
    }

    return (
        <>
            <button className="btn btn-link" onClick={()=>goTo("/user/register")}>Регистрация на потребител</button>
        </>
    );

}

export default AdminPage;