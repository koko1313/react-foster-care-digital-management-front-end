import React, { useState, useEffect } from 'react';
import networkClient from '../network/network-client';
import { Alert } from 'reactstrap';
import RegionsSelect from './base-components/Select/RegionsSelect';
import SubRegionsSelect from './base-components/Select/SubRegionsSelect';
import CitiesSelect from './base-components/Select/CitiesSelect';
import PositionsSelect from './base-components/Select/PositionsSelect';

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
                regionId: region,
                subRegionId: subRegion,
                cityId: city,
                positionId: position,
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

    return (
        <>
            {showAlert()}

            <form>
                <PositionsSelect label="Позиция" placeholder="Избери позиция ..." onChange={(e) => setPosition(e.target.value)} />

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

                <RegionsSelect label="Област" placeholder="Избери област ..." onChange={(e) => setRegion(e.target.value)} />

                <SubRegionsSelect label="Община" placeholder="Избери община ..." onChange={(e) => setSubRegion(e.target.value)} />

                <CitiesSelect label="Град" placeholder="Избери град ..." onChange={(e) => setCity(e.target.value)} />

                <button type="button" className="btn btn-primary" onClick={registerUser}>Регистрирай</button>
            </form>
        </>
    );

}

export default RegisterUserComponent;