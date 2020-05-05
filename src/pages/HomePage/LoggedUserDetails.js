import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUserRolesLabels } from '../../helpers';

const LoggedUserDetails = (props) => {

    const history = useHistory();

    return <>
        <h2>Здравейте, {props.user.first_name}</h2>
        <hr />
        <p><strong>Email:</strong> {props.user.email}</p>
        <p><strong>Роли:</strong> {getUserRolesLabels(props.user.roles).join(', ')}</p>

        <div className="d-flex justify-content-end">
            <button className="btn btn-danger" onClick={() => {history.push("/logout")}}>Изход</button>
        </div>
    </>;

}

export default LoggedUserDetails;