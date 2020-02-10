import React, { useState } from 'react';
import networkClient from '../../network/network-client';
import { Alert } from 'reactstrap';
import Input from '../base-components/Form/Input';
import NamesInput from '../base-components/Form/NamesInput';
import RegionsSelect from '../base-components/Form/Select/RegionsSelect';
import SubRegionsSelect from '../base-components/Form/Select/SubRegionsSelect';
import CitiesSelect from '../base-components/Form/Select/CitiesSelect';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../base-components/Loader';
import { useDispatch } from 'react-redux';
import actions from "../../redux/actions";
import BackButton from '../base-components/BackButton';

const FormComponent = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [isEditingUser, setIsEditingUser] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

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

    useState(() => {
        if(id) {
            setIsEditingUser(true);
            setIsLoading(true);

            networkClient.get(`/employee-oepg/${id}`, null, 
                (user) => {
                    setEmail(user.email);
                    setFirstName(user.first_name);
                    setSecondName(user.second_name);
                    setLastName(user.last_name);
                    setRegion(user.region.id);
                    setSubRegion(user.sub_region.id);
                    setCity(user.city.id);
                    setIsLoading(false);
                },
                (error) => {
                    if(error.response) {
                        switch(error.response.status) {
                            case 401:
                                dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                                dispatch(actions.deleteLoggedUser());
                                break;
                            case 404:
                                dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерен такъв потребител!"}));
                                history.goBack();
                                break;
                            default:
                                dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се объркаa!"}));
                                break;
                        }
                    } else {
                        dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
                    }
                }
            );
        }
    }, [id]);
    

    const registerUser = () => {
        if(password !== rePassword) {
            setAlert({color: "danger", message: "Паролите не съвпадат!"});
            return null;
        }

        setIsLoading(true);
        const data = {
            email: email,
            password: password,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            regionId: region,
            subRegionId: subRegion,
            cityId: city,
        };

        networkClient.post("/employee-oepg/register", data,
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно регистриран потребител!"});
                history.push("/employee-oepg/all");
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 409:
                            setAlert({color: "danger", message: "Вече съществува потребител с този email адрес!"});
                            break;
                        case 400:
                            setAlert({color: "danger", message: "Не са попълнени всички полета!"});
                            break;
                        case 401:
                            dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                            dispatch(actions.deleteLoggedUser());
                            break;
                        default:
                            dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                            break;
                    }
                } else {
                    dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
                }

                setIsLoading(false);
            }
        );
    }

    const updateUser = () => {
        if(password !== rePassword) {
            setAlert({color: "danger", message: "Паролите не съвпадат!"});
            return null;
        }

        setIsLoading(true);
        const data = {
            email: email,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            regionId: region,
            subRegionId: subRegion,
            cityId: city,
        };
        
        networkClient.put(`/employee-oepg/update/${id}`, data,
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно редактиран потребител!"});
                history.push("/employee-oepg/all");
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
                        case 409:
                            setAlert({color: "danger", message: "Вече съществува потребител с този email адрес!"});
                            break;
                        case 400:
                            setAlert({color: "danger", message: "Не са попълнени всички полета!"});
                            break;
                        case 401:
                            dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                            dispatch(actions.deleteLoggedUser());
                            break;
                        default:
                            dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                            break;
                    }
                } else {
                    dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
                }
            }
        )
        .finally(()=> {
            setIsLoading(false);
        });
    }

    return (
        <>
            <Alert color={alert.color} isOpen={alert.message ? true : false} toggle={onDismiss}>
                {alert.message}
            </Alert>

            <form>
                <Input id="email" label="Email" type="email" placeholder="Email ..." required={true} onChange={(e) => setEmail(e.target.value)} value={email} />

                {isEditingUser ? null :
                    <>
                        <Input id="password" label="Парола" type="password" placeholder="Парола ..." required={true} onChange={(e) => setPassword(e.target.value)} />
                        <Input id="rePassword" label="Повтори парола" type="password" placeholder="Повтори парола ..." required={true} onChange={(e) => setRePassword(e.target.value)} />
                    </>
                }

                <NamesInput 
                    id = "name" 
                    label = "Име" 
                    required = {true} 
                    firstName = {firstName} 
                    secondName = {secondName} 
                    lastName = {lastName} 
                    onChangeFirstName = {(e) => setFirstName(e.target.value)}
                    onChangeSecondName = {(e) => setSecondName(e.target.value)}
                    onChangeLastName = {(e) => setLastName(e.target.value)}
                />

                <div className="form-row">
                    <div className="col-md">
                        <RegionsSelect id="region" label="Област" placeholder="Избери област ..." required={true} onChange={(e) => setRegion(e.target.value)} value={region} />
                    </div>
                    <div className="col-md">
                        <SubRegionsSelect id="subRegion" label="Община" placeholder="Избери община ..." required={true} onChange={(e) => setSubRegion(e.target.value)} value={subRegion} />
                    </div>
                    <div className="col-md">
                        <CitiesSelect id="city" label="Град" placeholder="Избери град ..." required={true} onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                </div>

                <div className="pull-right">
                    {isEditingUser ?
                        <button type="button" className="btn btn-warning" onClick={updateUser}>Редактирай</button>
                        :
                        <button type="button" className="btn btn-primary" onClick={registerUser}>Регистрирай</button>
                    }
                    <BackButton />
                </div>
            </form>

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default FormComponent;