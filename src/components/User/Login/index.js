import React, {useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../../redux/actions";

// import server simulation
import * as Server from '../../../backend/server/users';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const u = useSelector(state => state.loggedUser);

    const dispatch = useDispatch();

    const login = () => {
        const authenticatedUser = Server.login(email, password);
        if(Object.entries(authenticatedUser).length !== 0) {
            dispatch(actions.setLoggedUser(authenticatedUser));
        } else {
            alert("Грешен email или парола!");
        }
    }

    return (
        <>
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
        </>
    );

}

export default Login;