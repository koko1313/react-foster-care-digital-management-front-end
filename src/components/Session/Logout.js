import React from 'react';
import networkClient from '../../network/network-client';
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';

const Logout = () => {

    let history = useHistory()
    const dispatch = useDispatch();

    const logout = () => {
        networkClient.post("logout", null,
            // success
            (loggedUser) => {
                // remove logged user from redux
                //dispatch(actions.deleteLoggedUser());
                window.location.href = "/"; // refresh the page, so clear all the reducers
            },
            // fail
            () => {
                dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
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