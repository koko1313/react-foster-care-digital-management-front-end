import React, { useState } from 'react';
import networkClient from '../network/network-client';
import Alert from './base-components/Alert';
import Input from './base-components/Form/Input';
import RegionsSelect from './base-components/Form/Select/RegionsSelect';
import SubRegionsSelect from './base-components/Form/Select/SubRegionsSelect';
import CitiesSelect from './base-components/Form/Select/CitiesSelect';
import PositionsSelect from './base-components/Form/Select/PositionsSelect';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import Loader from './base-components/Loader';

const RegisterUserComponent = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const isLoading = useSelector(state => state.loading);

    const [isEditingUser, setIsEditingUser] = useState(false);

    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [region, setRegion] = useState("");
    const [subRegion, setSubRegion] = useState("");
    const [city, setCity] = useState("");

    const { id } = useParams(); // get parameter from url
    const dispatch = useDispatch();

    useState(() => {
        if(id) {
            setIsEditingUser(true);
            dispatch(actions.setLoading(true));

            networkClient.get(`user/${id}`, null, (user) => {
                console.log(user);
                setPosition(user.position.id);
                setEmail(user.email);
                setFirstName(user.first_name);
                setSecondName(user.second_name);
                setLastName(user.last_name);
                setRegion(user.region.id);
                setSubRegion(user.sub_region.id);
                setCity(user.city.id);
                dispatch(actions.setLoading(false));
            });
        }
    }, [id]);
    

    const registerUser = () => {
        if(password !== rePassword) {
            setAlert({color: "danger", message: "Паролите не съвпадат!"});
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
                setAlert({color: "success", message: "Успешно регистриран потребител!"});
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 409: {
                            setAlert({color: "danger", message: "Вече съществува потребител с този email адрес!"});
                            break;
                        }
                        case 400: {
                            setAlert({color: "danger", message: "Не са попълнени всички полета!"});
                            break;
                        }
                        default: {
                            setAlert({color: "danger", message: "Възникна грешка!"});
                        }
                    }
                } else {
                    setAlert({color: "danger", message: "Възникна грешка!"});
                }
            }
        );
    }

    const updateUser = () => {
        if(password !== rePassword) {
            setAlert({color: "danger", message: "Паролите не съвпадат!"});
            return null;
        }

        networkClient.put(`/user/update/${id}`, 
            {
                email: email,
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
                setAlert({color: "success", message: "Успешно редактиран потребител!"});
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 409: {
                            setAlert({color: "danger", message: "Вече съществува потребител с този email адрес!"});
                            break;
                        }
                        case 400: {
                            setAlert({color: "danger", message: "Не са попълнени всички полета!"});
                            break;
                        }
                        default: {
                            setAlert({color: "danger", message: "Възникна грешка!"});
                        }
                    }
                } else {
                    setAlert({color: "danger", message: "Възникна грешка!"});
                }
            }
        );
    }

    return (
        <>
            <Alert color={alert.color} message={alert.message} /> 

            <form>
                <PositionsSelect label="Позиция" placeholder="Избери позиция ..." onChange={(e) => setPosition(e.target.value)} value={position} />

                <Input id="email" label="Email" type="email" placeholder="Email ..." onChange={(e) => setEmail(e.target.value)} value={email} />

                {isEditingUser ? null :
                    <>
                        <Input id="password" label="Парола" type="password" placeholder="Парола ..." onChange={(e) => setPassword(e.target.value)} />
                        <Input id="rePassword" label="Повтори парола" type="password" placeholder="Повтори парола ..." onChange={(e) => setRePassword(e.target.value)} />
                    </>
                }

                <Input id="firstName" label="Име" type="text" placeholder="Име ..." onChange={(e) => setFirstName(e.target.value)} value={firstName} />

                <Input id="secondName" label="Презиме" type="text" placeholder="Презиме ..." onChange={(e) => setSecondName(e.target.value)} value={secondName} />

                <Input id="lastName" label="Фамилия" type="text" placeholder="Фамилия ..." onChange={(e) => setLastName(e.target.value)} value={lastName} />

                <RegionsSelect id="region" label="Област" placeholder="Избери област ..." onChange={(e) => setRegion(e.target.value)} value={region} />

                <SubRegionsSelect id="subRegion" label="Община" placeholder="Избери община ..." onChange={(e) => setSubRegion(e.target.value)} value={subRegion} />

                <CitiesSelect id="city" label="Град" placeholder="Избери град ..." onChange={(e) => setCity(e.target.value)} value={city} />

                {isEditingUser ?
                    <button type="button" className="btn btn-warning" onClick={updateUser}>Редактирай</button>
                    :
                    <button type="button" className="btn btn-primary" onClick={registerUser}>Регистрирай</button>
                }
            </form>

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default RegisterUserComponent;