import React, { useState, useEffect } from 'react';
import networkClient from '../network/network-client';
import { Alert } from 'reactstrap';
import Input from './base-components/Form/Input';
import RegionsSelect from './base-components/Form/Select/RegionsSelect';
import SubRegionsSelect from './base-components/Form/Select/SubRegionsSelect';
import CitiesSelect from './base-components/Form/Select/CitiesSelect';
import PositionsSelect from './base-components/Form/Select/PositionsSelect';

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

                <Input id="email" label="Email" type="email" placeholder="Email ..." onChange={(e) => setEmail(e.target.value)} />

                <Input id="password" label="Парола" type="password" placeholder="Парола ..." onChange={(e) => setPassword(e.target.value)} />

                <Input id="rePassword" label="Повтори парола" type="password" placeholder="Повтори парола ..." onChange={(e) => setRePassword(e.target.value)} />

                <Input id="firstName" label="Име" type="text" placeholder="Име ..." onChange={(e) => setFirstName(e.target.value)} />

                <Input id="secondName" label="Презиме" type="text" placeholder="Презиме ..." onChange={(e) => setSecondName(e.target.value)} />

                <Input id="lastName" label="Фамилия" type="text" placeholder="Фамилия ..." onChange={(e) => setLastName(e.target.value)} />

                <RegionsSelect label="Област" placeholder="Избери област ..." onChange={(e) => setRegion(e.target.value)} />

                <SubRegionsSelect label="Община" placeholder="Избери община ..." onChange={(e) => setSubRegion(e.target.value)} />

                <CitiesSelect label="Град" placeholder="Избери град ..." onChange={(e) => setCity(e.target.value)} />

                <button type="button" className="btn btn-primary" onClick={registerUser}>Регистрирай</button>
            </form>
        </>
    );

}

export default RegisterUserComponent;