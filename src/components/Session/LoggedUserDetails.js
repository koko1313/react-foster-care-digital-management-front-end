import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUserRolesLabels } from '../../helpers';
import { useSelector } from 'react-redux';

const LoggedUserDetails = () => {

    const loggedUser = useSelector(state => state.loggedUser);
    const history = useHistory();

    return <>
        <h2>Здравейте, {loggedUser.first_name}!</h2>
        <hr />
        <p><strong>Email:</strong> {loggedUser.email}</p>
        <p><strong>Роли:</strong> {getUserRolesLabels(loggedUser.roles).join(', ')}</p>

        <div className="d-flex justify-content-end">
            <button className="btn btn-danger" onClick={() => {history.push("/logout")}}>Изход</button>
        </div>
    </>;

}

export default LoggedUserDetails;