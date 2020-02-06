import React, {useState} from 'react';
import networkClient from '../../network/network-client';

import { useDispatch } from 'react-redux';
import * as actions from "../../redux/actions";
import { Alert } from 'reactstrap';
import Loader from '../base-components/Loader';

const Login = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        
        setIsLoading(true)
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

                setIsLoading(false);
            }
        );
    }

    return <>
        <Loader loading={isLoading} />

        <Alert color={alert.color} isOpen={alert.message ? true : false} toggle={onDismiss}>
            {alert.message}
        </Alert>

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