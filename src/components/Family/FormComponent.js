import React, { useState } from 'react';
import networkClient from '../../network/network-client';
import { Alert } from 'reactstrap';
import Input from '../base-components/Form/Input';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../base-components/Loader';
import Select from '../base-components/Form/Select/Select';
import { useSelector, useDispatch } from 'react-redux';
import actions from "../../redux/actions";
import RegionsSelect from '../base-components/Form/Select/RegionsSelect';
import SubRegionsSelect from '../base-components/Form/Select/SubRegionsSelect';
import CitiesSelect from '../base-components/Form/Select/CitiesSelect';
import NamesInput from '../base-components/Form/NamesInput';

const FormComponent = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [titular, setTitular] = useState("");
    const [womanFirstName, setWomanFirstName] = useState("");
    const [womanSecondName, setWomanSecondName] = useState("");
    const [womanLastName, setWomanLastName] = useState("");
    const [manFirstName, setManFirstName] = useState("");
    const [manSecondName, setManSecondName] = useState("");
    const [manLastName, setManLastName] = useState("");
    const [preferKidGender, setPreferKidGender] = useState("");
    const [preferKidMinAge, setPreferKidMinAge] = useState("");
    const [preferKidMaxAge, setPreferKidMaxAge] = useState("");
    const [region, setRegion] = useState("");
    const [subRegion, setSubRegion] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [wardenId, setWardenId] = useState("");

    const [warden, setWarden] = useState();

    const { id } = useParams(); // get parameter from url
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.loggedUser); // get logged user, it have to be EmployeeOEPG

    useState(() => {
        if(id) {
            setIsEditing(true);
            setIsLoading(true);

            networkClient.get(`/family/${id}`, null, 
                (family) => {
                    setTitular(family.titular);
                    setWomanFirstName(family.woman_first_name);
                    setWomanSecondName(family.woman_second_name);
                    setWomanLastName(family.woman_last_name);
                    setManFirstName(family.man_first_name);
                    setManSecondName(family.man_second_name);
                    setManLastName(family.man_last_name);
                    setPreferKidGender(family.prefer_kid_gender);
                    setPreferKidMinAge(family.prefer_kid_min_age);
                    setPreferKidMaxAge(family.prefer_kid_max_age);
                    if(family.region) setRegion(family.region.id);
                    if(family.sub_region) setSubRegion(family.sub_region.id);
                    if(family.city) setCity(family.city.id);
                    setAddress(family.address);
                    setWardenId(family.warden.id);

                    setWarden(family.warden); // when editing, warden is family warden

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
                                dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерено такова семейство!"}));
                                history.goBack();
                                break;
                            default:
                                dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                                break;
                        }
                    } else {
                        dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
                    }
                }
            );
        } else {
            setWardenId(loggedUser.id);
            setWarden(loggedUser); // when registering family, warden is current logged user
        }     
    }, [id]);
    

    const register = () => {
        const data = {
            titular: titular,
            womanFirstName: womanFirstName,
            womanSecondName: womanSecondName,
            womanLastName: womanLastName,
            manFirstName: manFirstName,
            manSecondName: manSecondName,
            manLastName: manLastName,
            preferKidGender: preferKidGender,
            preferKidMinAge: preferKidMinAge,
            preferKidMaxAge: preferKidMaxAge,
            regionId: region,
            subRegionId: subRegion,
            cityId: city,
            address: address,
            wardenId: wardenId,
        };

        setIsLoading(true);
        networkClient.post("/family/register", data,
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно регистрирано семейство!"});
                history.push("/family/all");
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
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

    const update = () => {
        setIsLoading(true);
        const data = {
            titular: titular,
            womanFirstName: womanFirstName,
            womanSecondName: womanSecondName,
            womanLastName: womanLastName,
            manFirstName: manFirstName,
            manSecondName: manSecondName,
            manLastName: manLastName,
            preferKidGender: preferKidGender,
            preferKidMinAge: preferKidMinAge,
            preferKidMaxAge: preferKidMaxAge,
            regionId: region,
            subRegionId: subRegion,
            cityId: city,
            address: address,
            wardenId: wardenId,
        };

        networkClient.put(`/family/update/${id}`, data,
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно редактирано семейство!"});
                history.goBack();
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
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
                <NamesInput 
                    id = "womanName" 
                    label = "Жена" 
                    required = {true} 
                    firstName = {womanFirstName} 
                    secondName = {womanSecondName} 
                    lastName = {womanLastName} 
                    onChangeFirstName = {(e) => setWomanFirstName(e.target.value)}
                    onChangeSecondName = {(e) => setWomanSecondName(e.target.value)}
                    onChangeLastName = {(e) => setWomanLastName(e.target.value)}
                    
                    includeTitularSelect = {true}
                    name = "titular" 
                    value = {"woman"}
                    onSelect = {(e) => setTitular(e.target.value)}
                    checked = {titular === "woman"}
                />

                <NamesInput 
                    id = "manName" 
                    label = "Мъж" 
                    required = {true} 
                    firstName = {manFirstName} 
                    secondName = {manSecondName} 
                    lastName = {manLastName} 
                    onChangeFirstName = {(e) => setManFirstName(e.target.value)}
                    onChangeSecondName = {(e) => setManSecondName(e.target.value)}
                    onChangeLastName = {(e) => setManLastName(e.target.value)}

                    includeTitularSelect = {true}
                    name = "titular" 
                    value = {"man"}
                    onSelect = {(e) => setTitular(e.target.value)}
                    checked = {titular === "man"}
                />

                <div className="form-row">
                    <div className="form-group col-md">
                        <Select id="preferKidGender" label="Предпочитан пол на децата" placeholder="Избери предпочитан пол ..." onChange={(e) => setPreferKidGender(e.target.value)} value={preferKidGender}>
                            <option value="m">Момче</option>
                            <option value="f">Момиче</option>
                        </Select>
                    </div>
                    <div className="form-group col-md">
                        <Input id="preferKidMinAge" label="Минимална възраст" type="number" placeholder="Минимална възраст ..." onChange={(e) => setPreferKidMinAge(e.target.value)} value={preferKidMinAge} />
                    </div>
                    <div className="form-group col-md">
                        <Input id="preferKidMaxAge" label="Максимална възраст" type="number" placeholder="Максимална възраст ..." onChange={(e) => setPreferKidMaxAge(e.target.value)} value={preferKidMaxAge} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md">
                        <RegionsSelect id="region" label="Област" placeholder="Избери област ..." onChange={(e) => setRegion(e.target.value)} value={region} />
                    </div>
                    <div className="form-group col-md">
                        <SubRegionsSelect id="subRegion" label="Община" placeholder="Избери община ..." onChange={(e) => setSubRegion(e.target.value)} value={subRegion} />
                    </div>
                    <div className="form-group col-md">
                        <CitiesSelect id="city" label="Град" placeholder="Избери град ..." onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                </div>
                
                <Input id="address" label="Адрес" type="text" placeholder="Адрес ..." value={address} onChange={(e) => setAddress(e.target.value)} />

                <Input 
                    id="warden" 
                    label="Социален работник" 
                    type="text" 
                    value={warden ? `${warden.first_name} ${warden.second_name} ${warden.last_name}` : ""} 
                    disabled={true} />

                {isEditing ?
                    <button type="button" className="btn btn-warning" onClick={update}>Редактирай</button>
                    :
                    <button type="button" className="btn btn-primary" onClick={register}>Регистрирай</button>
                }
            </form>

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default FormComponent;