import React from 'react';
import networkClient from '../../network/network-client';
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux';
import * as actions from "../../redux/actions";
import Loader from '../base-components/Loader';

const Logout = () => {

    let history = useHistory()
    const dispatch = useDispatch();

    const logout = () => {
        networkClient.post("logout", null,
            // success
            (loggedUser) => {
                // remove logged user from redux
                dispatch(actions.setLoggedUser({}));
                history.push("/");
            },
            // fail
            () => {
                alert("Неуспешно излизане!");
                history.goBack();
            }
        );
    }

    return <>
        {logout()}

        Излизане...

        <Loader loading={true} />
    </>;

}

export default Logout;