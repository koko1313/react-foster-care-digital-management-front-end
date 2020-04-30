import React, { useState, useEffect } from 'react';
import { objectIsEmpty } from '../../../helpers';
import networkClient from '../../../network/network-client';
import { Alert } from 'reactstrap';
import Input from '../../base-components/Form/Input';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../base-components/Loader';
import Select from '../../base-components/Form/Select/Select';
import NamesInput from '../../base-components/Form/NamesInput';
import AddressInput from '../../base-components/Form/AddressInput';
import { useSelector, useDispatch } from 'react-redux';
import actions from "../../../redux/actions";
import BackButton from '../../base-components/BackButton';
import validator from 'validator';
import FamilySelect from './FamilySelect';

/**
 * 
 * @param {boolean} isEditing 
 */
const FormComponent = (props) => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [egn, setEgn] = useState("");
    const [gender, setGender] = useState("");
    const [familyId, setFamilyId] = useState("");
    const [region, setRegion] = useState("");
    const [subRegion, setSubRegion] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");

    const [wardenId, setWardenId] = useState("");

    const [warden, setWarden] = useState();

    const [validFields, setValidFields] = useState({
        isFirstNameValid: true,
        isSecondNameValid: true,
        isLastNameValid: true,
        isEgnValid: true,
        isRegionValid: true,
        isSubRegionValid: true,
        isCityValid: true,
        isAddressValid: true,
    });

    const { id } = useParams(); // get parameter from url

    const history = useHistory();
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.loggedUser); // get logged user, it have to be EmployeeOEPG
    const child = useSelector(state => state.currentChild);

    // data that will be send to server
    const data = {
        firstName: firstName,
        secondName: secondName,
        lastName: lastName,
        egn: egn,
        gender: gender,
        familyId: familyId,
        regionId: region,
        subRegionId: subRegion,
        cityId: city,
        address: address,

        wardenId: wardenId,
    };

    /**
     * @returns True when all fields are valid and False when some of the fields is not valid
     */
    const validate = () => {
        const validFields = {
            isFirstNameValid: !validator.isEmpty(firstName),
            isSecondNameValid: !validator.isEmpty(secondName),
            isLastNameValid: !validator.isEmpty(lastName),
            isEgnValid: validator.isLength(egn, {min:10, max: 10}),
            isRegionValid: !validator.isEmpty(region + ""),
            isSubRegionValid: !validator.isEmpty(subRegion + ""),
            isCityValid: !validator.isEmpty(city + ""),
            isAddressValid: !validator.isEmpty(address + ""),
        }

        setValidFields(validFields);

        for(const field in validFields) {
            if(validFields[field] === false) return false;
        }

        return true;
    }

    const processErrorMessages = (error) => {
        if(error.response) {
            switch(error.response.status) {
                case 400:
                    setAlert({color: "danger", message: "Не са попълнени всички полета!"});
                    break;
                case 401:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                    dispatch(actions.deleteLoggedUser());
                    break;
                case 404:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерено такова дете!"}));
                    history.goBack();
                    break;
                case 409:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Дете с това ЕГН вече съществува!"}));
                    break;
                default:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                    break;
            }
        } else {
            dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
        }
    }

    useEffect(() => {
        if(props.isEditing) {
            if((!objectIsEmpty(child) && Number(child.id) !== Number(id)) || objectIsEmpty(child)) {
                setIsLoading(true);
            
                networkClient.get(`/child/${id}`, null, 
                    (child) => {
                        dispatch(actions.setCurrentChild(child));
                        setIsLoading(false);
                    },
                    (error) => {
                        processErrorMessages(error);
                        setIsLoading(false);
                    }
                );
            }
    
            if(objectIsEmpty(child)) return; // when form page is loaded in edit mode and there is no current child, so we wait for child from server

            setIsLoading(true);

            setFirstName(child.first_name);
            setSecondName(child.second_name);
            setLastName(child.last_name);
            setEgn(child.egn);
            setGender(child.gender);
            
            if(child.family) {
                setFamilyId(child.family.id);
            }

            setRegion(child.region.id);
            setSubRegion(child.sub_region.id);
            setCity(child.city.id);
            setAddress(child.address);

            setWardenId(child.warden.id);

            setWarden(child.warden); // when editing, warden is family warden

            setIsLoading(false);
        } else {
            setWardenId(loggedUser.id);
            setWarden(loggedUser); // when registering family, warden is current logged user
        }

        // eslint-disable-next-line
    }, [child, loggedUser, props]);
    
    const register = () => {
        if(!validate()) return;

        setIsLoading(true);
        networkClient.post("/child/register", data,
            (registeredChild) => {
                setAlert({color: "success", message: "Успешно регистрирано дете!"});
                dispatch(actions.addChild(registeredChild));
                history.push("/child/all");
            },
            (error) => {
                processErrorMessages(error);

                setIsLoading(false);
            }
        );
    }

    const update = () => {
        if(!validate()) return;

        setIsLoading(true);
        networkClient.put(`/child/update/${child.id}`, data,
            (updatedChild) => {
                setAlert({color: "success", message: "Успешно редактирано дете!"});
                dispatch(actions.setCurrentChild(updatedChild)); // update the current child too
                dispatch(actions.updateChild(child.id, updatedChild));
                history.goBack();
                setIsLoading(false);
            },
            (error) => {
                processErrorMessages(error);
                setIsLoading(false);
            }
        );
    }

    return <>
        <Alert color={alert.color} isOpen={alert.message ? true : false} toggle={onDismiss}>
            {alert.message}
        </Alert>

        <form>
            <NamesInput 
                id = "name" 
                label = "Име ..." 
                required = {true} 
                firstName = {firstName} 
                secondName = {secondName} 
                lastName = {lastName} 
                onChangeFirstName = {(e) => setFirstName(e.target.value)}
                onChangeSecondName = {(e) => setSecondName(e.target.value)}
                onChangeLastName = {(e) => setLastName(e.target.value)}
                isFirstNameInvalid = {!validFields.isFirstNameValid}
                isSecondNameInvalid = {!validFields.isSecondNameValid}
                isLastNameInvalid = {!validFields.isLastNameValid}
            />

            <Input 
                label = "ЕГН" 
                type = "number" 
                placeholder = "ЕГН ..." 
                value = {egn} 
                onChange = {(e) => setEgn(e.target.value)} 
                required = {true} 
                isInvalid = {!validFields.isEgnValid}
                invalidMessage = "Невалидно ЕГН."
            />

            <Select id="gender" label="Пол" placeholder="Изберете пол ..." onChange={(e) => setGender(e.target.value)} value={gender}>
                <option value="Момиче">Момиче</option>
                <option value="Момче">Момче</option>
            </Select>

            <FamilySelect value={familyId} onChange={(e) => setFamilyId(e.target.value)} />

            <AddressInput 
                fullAddress = {true}
                region = {region}
                subRegion = {subRegion}
                city = {city}
                address = {address}
                regionOnChange = {(e) => setRegion(e.target.value)}
                subRegionOnChange = {(e) => setSubRegion(e.target.value)}
                cityOnChange = {(e) => setCity(e.target.value)}
                addressOnChange = {(e) => setAddress(e.target.value)}
                required = {true}
                isRegionInvalid = {!validFields.isRegionValid}
                isSubRegionInvalid = {!validFields.isSubRegionValid}
                isCityInvalid = {!validFields.isCityValid}
                isAddressInvalid = {!validFields.isAddressValid}
            />

            <Input 
                id="warden" 
                label="Социален работник" 
                type="text" 
                value={warden ? `${warden.first_name} ${warden.second_name} ${warden.last_name}` : ""} 
                disabled={true} />

            <div className="pull-right">
                {props.isEditing ?
                    <button type="button" className="btn btn-warning" onClick={update}>Редактирай</button>
                    :
                    <button type="button" className="btn btn-primary" onClick={register}>Регистрирай</button>
                }

                <BackButton />
            </div>
        </form>

        <Loader loading={isLoading} fullScreen={true} />
    </>;

}

export default FormComponent;