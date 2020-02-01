import React from 'react';
import networkClient from '../../../network/network-client';
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux';
import * as actions from "../../../redux/actions";

const Logout = () => {

    let history = useHistory()
    const dispatch = useDispatch();

    const logout = () => {
        // CALL BACKEND
        // networkClient.post("logout", null,
        //     // success
        //     (loggedUser) => {
        //         // remove logged user from redux
        //         dispatch(actions.setLoggedUser({}));
        //         history.push("/");
        //     },
        //     // fail
        //     () => {
        //         alert("Неуспешно излизане!");
        //         history.goBack();
        //     }
        // );

        // HARDCORED LOGOUT
        dispatch(actions.setLoggedUser({}));
        history.push("/");
    }

    return <>
        {logout()}

        Излизане...
    </>;

}

export default Logout;