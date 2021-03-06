import React, { useState, useEffect } from 'react';
import { objectIsEmpty } from '../../helpers';
import { Alert } from 'reactstrap';
import Input from '../base-components/Form/Input';
import NamesInput from '../base-components/Form/NamesInput';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../base-components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Validator from 'validator';
import BackButton from '../base-components/BackButton';
import AddressInput from '../base-components/Form/AddressInput';

/**
 * @param {boolean} isEditing 
 */
const FormComponent = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams(); // get parameter from url

    const employeeOEPG = useSelector(state => state.currentEmployeeOEPG);

    const [isLoading, setIsLoading] = useState(false);

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

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
    
    const [validFields, setValidFields] = useState({
        isEmailValid: true,
        isPasswordValid: true,
        isRePasswordValid: true,
        isFirstNameValid: true,
        isSecondNameValid: true,
        isLastNameValid: true,
        isRegionValid: true,
        isSubRegionValid: true,
        isCityValid: true,
    });
    
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
                    dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерен такъв потребител!"}));
                    history.goBack();
                    break;
                case 409:
                    setAlert({color: "danger", message: "Вече съществува потребител с този email адрес!"});
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
            setIsEditingUser(true);
            
            // Load current employee if it's not loaded
            if((!objectIsEmpty(employeeOEPG) && Number(employeeOEPG.id) !== Number(id)) || objectIsEmpty(employeeOEPG)) {
                setIsLoading(true);

                dispatch(actions.loadCurrentEmployeeOEPG(id))
                    .catch((error) => processErrorMessages(error))
                    .finally(() => setIsLoading(false));
            }

            if(objectIsEmpty(employeeOEPG)) return; // when form page is loaded in edit mode and there is no current emploeeOEPG, so we wait for employeeOEPG from server
        
            setEmail(employeeOEPG.email);
            setFirstName(employeeOEPG.first_name);
            setSecondName(employeeOEPG.second_name);
            setLastName(employeeOEPG.last_name);
            setRegion(employeeOEPG.region.id);
            setSubRegion(employeeOEPG.sub_region.id);
            setCity(employeeOEPG.city.id);
        }

        // eslint-disable-next-line 
    }, [employeeOEPG, props]);
    

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

    /**
     * @returns True when all fields are valid and False when some of the fields is not valid
     */
    const validate = () => {
        const validFields = {
            isEmailValid: Validator.isEmail(email),
            isFirstNameValid: !Validator.isEmpty(firstName, {ignore_whitespace: false}),
            isSecondNameValid: !Validator.isEmpty(secondName, {ignore_whitespace: false}),
            isLastNameValid: !Validator.isEmpty(lastName, {ignore_whitespace: false}),
            isRegionValid: !Validator.isEmpty(region + ""),
            isSubRegionValid: !Validator.isEmpty(subRegion + ""),
            isCityValid: !Validator.isEmpty(city + ""),
        }

        // if not editing user, validate the password too
        if(!isEditingUser) {
            Object.assign(validFields, {
                isPasswordValid: !Validator.isEmpty(password),
                isRePasswordValid: !Validator.isEmpty(rePassword),
            });
        }

        setValidFields(validFields);

        for(const field in validFields) {
            if(validFields[field] === false) return false;
        }

        return true;
    }

    const registerUser = () => {
        if(!validate()) return;

        if(password !== rePassword) {
            setAlert({color: "danger", message: "Паролите не съвпадат!"});
            return;
        }

        setIsLoading(true);

        dispatch(actions.addEmployeeOEPG(data))
            .then(() => history.push("/employee-oepg/all"))
            .catch((error) => processErrorMessages(error))
            .finally(() => setIsLoading(false));
    }

    const updateUser = () => {
        if(!validate()) return;

        setIsLoading(true);

        dispatch(actions.updateEmployeeOEPG(employeeOEPG.id, data))
            .then(() => history.push("/employee-oepg/all"))
            .catch((error) => processErrorMessages(error))
            .finally(() => setIsLoading(false));
    }

    return <>
        <Alert color={alert.color} isOpen={alert.message ? true : false} toggle={onDismiss}>
            {alert.message}
        </Alert>

        <form>
            <Input 
                id = "email" 
                label = "Email" 
                type = "email" 
                placeholder = "Email ..." 
                required = {true} 
                onChange = {(e) => setEmail(e.target.value)} value={email} 
                isInvalid = {!validFields.isEmailValid}
                invalidMessage = {"Невалиден Email."}
            />

            {isEditingUser ? null :
                <>
                    <Input 
                        id = "password" 
                        label = "Парола" 
                        type = "password" 
                        placeholder = "Парола ..." 
                        required = {true} 
                        onChange = {(e) => setPassword(e.target.value)} 
                        isInvalid = {!validFields.isPasswordValid}
                    />

                    <Input 
                        id="rePassword" 
                        label="Повтори парола" 
                        type="password" 
                        placeholder="Повтори парола ..." 
                        required={true} 
                        onChange={(e) => setRePassword(e.target.value)} 
                        isInvalid = {!validFields.isRePasswordValid}
                    />
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
                isFirstNameInvalid = {!validFields.isFirstNameValid}
                isSecondNameInvalid = {!validFields.isSecondNameValid}
                isLastNameInvalid = {!validFields.isLastNameValid}
            />

            <AddressInput 
                region = {region}
                subRegion = {subRegion}
                city = {city}
                regionOnChange = {(e) => setRegion(e.target.value)}
                subRegionOnChange = {(e) => setSubRegion(e.target.value)}
                cityOnChange = {(e) => setCity(e.target.value)}
                required = {true}
                isRegionInvalid = {!validFields.isRegionValid}
                isSubRegionInvalid = {!validFields.isSubRegionValid}
                isCityInvalid = {!validFields.isCityValid}
            />

            <div className="d-flex justify-content-end">
                {isEditingUser ?
                    <button type="button" className="btn btn-warning" onClick={updateUser}>Редактирай</button>
                    :
                    <button type="button" className="btn btn-primary" onClick={registerUser}>Регистрирай</button>
                }
                <BackButton />
            </div>
        </form>

        <Loader loading={isLoading} fullScreen={true} />
    </>;

}

export default FormComponent;