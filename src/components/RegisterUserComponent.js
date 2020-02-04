import React, { useState, useEffect } from 'react';
import networkClient from '../network/network-client';
import roles from '../roles';
import { Alert } from 'reactstrap';

const RegisterUserComponent = () => {

    const [position, setPosition] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [firstName, setFirstName] = useState();
    const [secondName, setSecondName] = useState();
    const [lastName, setLastName] = useState();
    const [region, setRegion] = useState();
    const [subRegion, setSubRegion] = useState();
    const [city, setCity] = useState();

    const [alertMessage, _setAlertMessage] = useState();
    const [alertType, _setAlertType] = useState();
    const [visible, openAlert] = useState(true);

    const [positionsFromServer, setPositionsFromServer] = useState();

    useEffect(() => {
        networkClient.get("/position/all", null, (positions) => {
            setPositionsFromServer(positions);
        });
    }, []);

    const setAlert = (type, message) => {
        _setAlertType(type);
        _setAlertMessage(message);
        openAlert(true);
    }

    const showAlert = () => {
        let color;

        if(alertType === "SUCCESS") color = "success";
        else if(alertType === "ERROR") color = "danger";
        
        if(alertMessage) {
            return <Alert color={color} isOpen={visible} toggle={() => {openAlert(false)}}>
                {alertMessage}
            </Alert>
        }
    }

    const registerUser = () => {
        if(password !== rePassword) {
            setAlert("ERROR", "Паролите не съвпадат!");
            return null;
        }

        networkClient.post("/register", 
            {
                email: email,
                password: password,
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                region: region,
                subRegion: subRegion,
                city: city,
                roles: [position],
            },
            // success
            (response) => {
                setAlert("SUCCESS", "Успешно регистриран потребител!");
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 409: {
                            setAlert("ERROR", "Вече съществува потребител с този email адрес!");
                            break;
                        }
                        default: {
                            setAlert("ERROR", "Грешка при регистрирането на потребителя!");
                        }
                    }
                } else {
                    setAlert("ERROR", "Грешка при регистрирането на потребителя!");
                }
            }
        );
    }

    const renderPositions = () => {
        if(!positionsFromServer) return null;

        return positionsFromServer.map((position) => {
            return <option key={position.id} value={position.role.name}>{position.name}</option>
        });
    }

    return (
        <>
            {showAlert()}

            <form>
                <div className="form-group">
                    <label htmlFor="position">Позиция</label>
                    <select id="position" className="form-control" onChange={(e) => setPosition(e.target.value)}>
                        <option defaultValue>Избери позиция ...</option>
                        {renderPositions()}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email ..." onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Парола</label>
                    <input type="password" className="form-control" id="password" placeholder="Парола ..." onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="rePassword">Повтори парола</label>
                    <input type="password" className="form-control" id="rePassword" placeholder="Повтори парола ..." onChange={(e) => setRePassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Име</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Име ..." onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="secondName">Презиме</label>
                    <input type="text" className="form-control" id="secondName" placeholder="Презиме ..." onChange={(e) => setSecondName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Фамилия ..." onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="region">Област</label>
                    <select id="region" className="form-control" onChange={(e) => setRegion(e.target.value)}>
                        <option defaultValue>Избери област ...</option>
                        <option value="Монтана">Монтана</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subRegion">Община</label>
                    <select id="subRegion" className="form-control" onChange={(e) => setSubRegion(e.target.value)}>
                        <option defaultValue>Избери община ...</option>
                        <option value="Лом">Лом</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="city">Град</label>
                    <select id="city" className="form-control" onChange={(e) => setCity(e.target.value)}>
                        <option defaultValue>Избери град ...</option>
                        <option value="Лом">Лом</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={registerUser}>Регистрирай</button>
            </form>
        </>
    );

}

export default RegisterUserComponent;