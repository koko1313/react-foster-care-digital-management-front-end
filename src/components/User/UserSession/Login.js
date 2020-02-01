import React, {useState} from 'react';
import { Alert } from 'reactstrap';
import networkClient from '../../../network/network-client';

import { useDispatch } from 'react-redux';
import * as actions from "../../../redux/actions";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [alert, setAlert] = useState();
    const [visible, openAlert] = useState(true);

    const dispatch = useDispatch();

    const login = () => {
        // CALL BACKEND
        // networkClient.post("login", {email: email, password: password},
        //     // success
        //     (loggedUser) => {
        //         dispatch(actions.setLoggedUser(loggedUser));
        //     },
        //     // fail
        //     () => {
        //         setAlert("Грешен email или парола!");
        //         openAlert(true);
        //     }
        // );

        // HARDCORE LOGGED USER
        const loggedUser = {
            email: "admin@admin.com",
            roles: ["ROLE_ADMIN"],
        }
        dispatch(actions.setLoggedUser(loggedUser));
    }

    const showAlert = () => {
        if(alert) {
            return <Alert color="danger" isOpen={visible} toggle={() => {openAlert(false)}}>
                {alert}
            </Alert>
        }
    }

    return <>
        {showAlert()}

        <form>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => {setPassword(e.target.value);}} />
            </div>
            <button type="button" className="btn btn-primary" onClick={login}>Вход</button>
        </form>
    </>;

}

export default Login;