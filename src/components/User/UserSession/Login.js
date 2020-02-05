import React, {useState} from 'react';
import networkClient from '../../../network/network-client';

import { useDispatch } from 'react-redux';
import * as actions from "../../../redux/actions";
import Alert from '../../base-components/Alert';

const Login = () => {

    const [alert, setAlert] = useState({color: null, message: null});

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        
        networkClient.post("login", {email: email, password: password},
            // success
            (loggedUser) => {
                dispatch(actions.setLoggedUser(loggedUser));
            },
            // fail
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 401: {
                            setAlert({color: "danger", message: "Грешен email или парола!"});
                            break;
                        }
                        default: {
                            setAlert({color: "danger", message: "Нещо се обърка!"});
                        }
                    }
                } else {
                    setAlert({color: "danger", message: "Нещо се обърка!"});
                }
            }
        );
    }

    return <>
        <Alert color={alert.color} message={alert.message} /> 

        <form onSubmit={login}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => {setPassword(e.target.value);}} />
            </div>
            <button type="submit" className="btn btn-primary" >Вход</button>
        </form>
    </>;

}

export default Login;