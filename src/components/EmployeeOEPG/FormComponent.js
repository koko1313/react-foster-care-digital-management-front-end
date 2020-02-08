import React, { useState } from 'react';
import networkClient from '../../network/network-client';
import { Alert } from 'reactstrap';
import Input from '../base-components/Form/Input';
import RegionsSelect from '../base-components/Form/Select/RegionsSelect';
import SubRegionsSelect from '../base-components/Form/Select/SubRegionsSelect';
import CitiesSelect from '../base-components/Form/Select/CitiesSelect';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../base-components/Loader';

const FormComponent = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [isEditingUser, setIsEditingUser] = useState(false);

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
    const history = useHistory();

    useState(() => {
        if(id) {
            setIsEditingUser(true);
            setIsLoading(true);

            networkClient.get(`/employee-oepg/${id}`, null, (user) => {
                setEmail(user.email);
                setFirstName(user.first_name);
                setSecondName(user.second_name);
                setLastName(user.last_name);
                setRegion(user.region.id);
                setSubRegion(user.sub_region.id);
                setCity(user.city.id);
                setIsLoading(false);
            });
        }
    }, [id]);
    

    const registerUser = () => {
        if(password !== rePassword) {
            setAlert({color: "danger", message: "Паролите не съвпадат!"});
            return null;
        }

        setIsLoading(true);
        networkClient.post("/employee-oepg/register", 
            {
                email: email,
                password: password,
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                regionId: region,
                subRegionId: subRegion,
                cityId: city,
            },
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно регистриран потребител!"});
                history.push("/employee-oepg/all");
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
        networkClient.put(`/employee-oepg/update/${id}`, 
            {
                email: email,
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                regionId: region,
                subRegionId: subRegion,
                cityId: city,
            },
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно редактиран потребител!"});
                history.push("/employee-oepg/all");
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
                        <Input id="password" label="Парола" type="password" placeholder="Парола ..." onChange={(e) => setPassword(e.target.value)} />
                        <Input id="rePassword" label="Повтори парола" type="password" placeholder="Повтори парола ..." onChange={(e) => setRePassword(e.target.value)} />
                    </>
                }

                <Input id="firstName" label="Име" type="text" placeholder="Име ..." required={true} onChange={(e) => setFirstName(e.target.value)} value={firstName} />

                <Input id="secondName" label="Презиме" type="text" placeholder="Презиме ..." required={true} onChange={(e) => setSecondName(e.target.value)} value={secondName} />

                <Input id="lastName" label="Фамилия" type="text" placeholder="Фамилия ..." required={true} onChange={(e) => setLastName(e.target.value)} value={lastName} />

                <RegionsSelect id="region" label="Област" placeholder="Избери област ..." required={true} onChange={(e) => setRegion(e.target.value)} value={region} />

                <SubRegionsSelect id="subRegion" label="Община" placeholder="Избери община ..." required={true} onChange={(e) => setSubRegion(e.target.value)} value={subRegion} />

                <CitiesSelect id="city" label="Град" placeholder="Избери град ..." required={true} onChange={(e) => setCity(e.target.value)} value={city} />

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

export default FormComponent;