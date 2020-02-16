import React, { useState, useEffect } from 'react';
import networkClient from '../../../network/network-client';
import { Alert } from 'reactstrap';
import Input from '../../base-components/Form/Input';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../../base-components/Loader';
import Select from '../../base-components/Form/Select/Select';
import { useSelector, useDispatch } from 'react-redux';
import actions from "../../../redux/actions";
import BackButton from '../../base-components/BackButton';
import ParentInput from './ParentInputs';
import AddressInput from '../../base-components/Form/AddressInput';
import validator from 'validator';

const FormComponent = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [titular, setTitular] = useState("");

    const [womanFirstName, setWomanFirstName] = useState("");
    const [womanSecondName, setWomanSecondName] = useState("");
    const [womanLastName, setWomanLastName] = useState("");
    const [womanEgn, setWomanEgn] = useState("");
    const [womanPhone, setWomanPhone] = useState("");
    const [womanEducation, setWomanEducation] = useState("");
    const [womanWork, setWomanWork] = useState("");
    const [womanEmploymentType, setWomanEmploymentType] = useState("");
    const [womanCitizenship, setWomanCitizenship] = useState("");

    const [manFirstName, setManFirstName] = useState("");
    const [manSecondName, setManSecondName] = useState("");
    const [manLastName, setManLastName] = useState("");
    const [manEgn, setManEgn] = useState("");
    const [manPhone, setManPhone] = useState("");
    const [manEducation, setManEducation] = useState("");
    const [manWork, setManWork] = useState("");
    const [manEmploymentType, setManEmploymentType] = useState("");
    const [manCitizenship, setManCitizenship] = useState("");

    const [preferKidGender, setPreferKidGender] = useState("");
    const [preferKidMinAge, setPreferKidMinAge] = useState("");
    const [preferKidMaxAge, setPreferKidMaxAge] = useState("");

    const [region, setRegion] = useState("");
    const [subRegion, setSubRegion] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");

    const [language, setLanguage] = useState("");
    const [levelOfBulgarianLanguage, setLevelOfBulgarianLanguage] = useState("");
    const [religion, setReligion] = useState("");

    const [familyType, setFamilyType] = useState("");
    const [averageMonthlyIncomePerFamilyMember, setAverageMonthlyIncomePerFamilyMember] = useState("");
    const [anotherIncome, setAnotherIncome] = useState("");
    const [houseType, setHouseType] = useState("");

    const [wardenId, setWardenId] = useState("");

    const [warden, setWarden] = useState();

    const [validFields, setValidFields] = useState({
        isWomanFirstNameValid: true,
        isWomanSecondNameValid: true,
        isWomanLastNameValid: true,
        isWomanEgnValid: true,
        isWomanPhoneValid: true,
        isWomanEducationValid: true,

        isManFirstNameValid: true,
        isManSecondNameValid: true,
        isManLastNameValid: true,
        isManEgnValid: true,
        isManPhoneValid: true,
        isManEducationValid: true,

        isPreferKidMinAgeValid: true,
        isPreferKidMaxAgeValid: true,

        isAverageMonthlyIncomePerFamilyMemberValid: true,
        isAnotherIncomeValid: true,

        isRegionValid: true,
        isSubRegionValid: true,
        isCityValid: true,
        isAddressValid: true,
    });

    const { id } = useParams(); // get parameter from url
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.loggedUser); // get logged user, it have to be EmployeeOEPG

    // data that will be send to server
    const data = {
        titular: titular,

        womanFirstName: womanFirstName,
        womanSecondName: womanSecondName,
        womanLastName: womanLastName,
        womanEgn: womanEgn,
        womanPhone: womanPhone,
        womanEducation: womanEducation,
        womanWork: womanWork,
        womanEmploymentType: womanEmploymentType,
        womanCitizenship: womanCitizenship,

        manFirstName: manFirstName,
        manSecondName: manSecondName,
        manLastName: manLastName,
        manEgn: manEgn,
        manPhone: manPhone,
        manEducation: manEducation,
        manWork: manWork,
        manEmploymentType: manEmploymentType,
        manCitizenship: manCitizenship,

        preferKidGender: preferKidGender,
        preferKidMinAge: preferKidMinAge,
        preferKidMaxAge: preferKidMaxAge,

        regionId: region,
        subRegionId: subRegion,
        cityId: city,
        address: address,

        language: language,
        levelOfBulgarianLanguage: levelOfBulgarianLanguage,
        religion: religion,

        familyType: familyType,
        averageMonthlyIncomePerFamilyMember: averageMonthlyIncomePerFamilyMember,
        anotherIncome: anotherIncome,
        houseType: houseType,

        wardenId: wardenId,
    };

    /**
     * @returns True when all fields are valid and False when some of the fields is not valid
     */
    const validate = () => {
        const validFields = {
            isWomanFirstNameValid: !validator.isEmpty(womanFirstName),
            isWomanSecondNameValid: !validator.isEmpty(womanSecondName),
            isWomanLastNameValid: !validator.isEmpty(womanLastName),
            isWomanEgnValid: validator.isLength(womanEgn, {min:10, max: 10}),
            isWomanPhoneValid: validator.isMobilePhone(womanPhone),
            isWomanEducationValid: !validator.isEmpty(womanEducation + ""),

            isManFirstNameValid: !validator.isEmpty(manFirstName),
            isManSecondNameValid: !validator.isEmpty(manSecondName),
            isManLastNameValid: !validator.isEmpty(manLastName),
            isManEgnValid: validator.isLength(manEgn, {min:10, max: 10}),
            isManPhoneValid: validator.isMobilePhone(manPhone),
            isManEducationValid: !validator.isEmpty(manEducation + ""),

            isPreferKidMinAgeValid: preferKidMinAge === null || validator.isEmpty(preferKidMinAge) || (validator.isNumeric(preferKidMinAge) && preferKidMinAge > 0),
            isPreferKidMaxAgeValid: preferKidMaxAge === null || validator.isEmpty(preferKidMaxAge) || (validator.isNumeric(preferKidMaxAge) && preferKidMaxAge > 0),

            isAverageMonthlyIncomePerFamilyMemberValid: averageMonthlyIncomePerFamilyMember === null || validator.isEmpty(averageMonthlyIncomePerFamilyMember || (validator.isNumeric(averageMonthlyIncomePerFamilyMember) && averageMonthlyIncomePerFamilyMember > 0)),
            isAnotherIncomeValid: anotherIncome === null || validator.isEmpty(anotherIncome) || (validator.isNumeric(anotherIncome) && anotherIncome > 0),

            isRegionValid: !validator.isEmpty(region + ""),
            isSubRegionValid: !validator.isEmpty(subRegion + ""),
            isCityValid: !validator.isEmpty(city + ""),
            isAddressValid: !validator.isEmpty(address),
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

    useEffect(() => {
        if(id) {
            setIsEditing(true);
            setIsLoading(true);

            networkClient.get(`/family/${id}`, null, 
                (family) => {
                    setTitular(family.titular);

                    if(family.woman) {
                        setWomanFirstName(family.woman.first_name);
                        setWomanSecondName(family.woman.second_name);
                        setWomanLastName(family.woman.last_name);
                        setWomanEgn(family.woman.egn);
                        setWomanPhone(family.woman.phone);
                        setWomanEducation(family.woman.education);
                        setWomanWork(family.woman.work);
                        setWomanEmploymentType(family.woman.employment_type);
                        setWomanCitizenship(family.woman.citizenship);
                    }

                    if(family.man) {
                        setManFirstName(family.man.first_name);
                        setManSecondName(family.man.second_name);
                        setManLastName(family.man.last_name);
                        setManEgn(family.man.egn);
                        setManPhone(family.man.phone);
                        setManEducation(family.man.education);
                        setManWork(family.man.work);
                        setManEmploymentType(family.man.employment_type);
                        setManCitizenship(family.man.citizenship);
                    }

                    setPreferKidGender(family.prefer_kid_gender);
                    setPreferKidMinAge(family.prefer_kid_min_age);
                    setPreferKidMaxAge(family.prefer_kid_max_age);

                    if(family.region) setRegion(family.region.id);
                    if(family.sub_region) setSubRegion(family.sub_region.id);
                    if(family.city) setCity(family.city.id);
                    setAddress(family.address);

                    setLanguage(family.language);
                    setLevelOfBulgarianLanguage(family.level_of_bulgarian_language);
                    setReligion(family.religion);

                    setFamilyType(family.family_type);
                    setAverageMonthlyIncomePerFamilyMember(family.average_monthly_income_per_family_member);
                    setAnotherIncome(family.another_income);
                    setHouseType(family.house_type);

                    setWardenId(family.warden.id);

                    setWarden(family.warden); // when editing, warden is family warden

                    setIsLoading(false);
                },
                (error) => {
                    processErrorMessages(error);
                }
            );
        } else {
            setWardenId(loggedUser.id);
            setWarden(loggedUser); // when registering family, warden is current logged user
        }
        
        // eslint-disable-next-line
    }, [id]);
    
    const register = () => {
        if(!validate()) return;

        if(titular === "") {
            setAlert({color: "danger", message: "Не е избран титуляр!"});
            return;
        }

        setIsLoading(true);
        networkClient.post("/family/register", data,
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно регистрирано семейство!"});
                history.push("/family/all");
            },
            // error
            (error) => {
                processErrorMessages(error);

                setIsLoading(false);
            }
        );
    }

    const update = () => {
        if(!validate()) return;

        if(titular === "") {
            setAlert({color: "danger", message: "Не е избран титуляр!"});
            return;
        }

        setIsLoading(true);
        networkClient.put(`/family/update/${id}`, data,
            (response) => {
                setAlert({color: "success", message: "Успешно редактирано семейство!"});
                history.goBack();
                setIsLoading(false);
            },
            (error) => {
                processErrorMessages(error);
                setIsLoading(false);
            }
        );
    }

    return (
        <>
            <p className="text-muted"><em>При приемно семейство с един родител се попълват данните или само за мъж или само за жена</em></p>

            <Alert color={alert.color} isOpen={alert.message ? true : false} toggle={onDismiss}>
                {alert.message}
            </Alert>

            <form>
                <div className="row">
                    {/* Жена */}
                    <div className="col-md">
                        <p><strong>Жена</strong></p>

                        <ParentInput 
                            firstName = {womanFirstName} 
                            secondName = {womanSecondName} 
                            lastName = {womanLastName} 
                            egn = {womanEgn}
                            phone = {womanPhone}
                            education = {womanEducation}
                            work = {womanWork}
                            employmentType = {womanEmploymentType}
                            citizenship = {womanCitizenship}

                            onChangeFirstName = {(e) => setWomanFirstName(e.target.value)}
                            onChangeSecondName = {(e) => setWomanSecondName(e.target.value)}
                            onChangeLastName = {(e) => setWomanLastName(e.target.value)}
                            onChangeEgn = {(e) => setWomanEgn(e.target.value)}
                            onChangePhone = {(e) => setWomanPhone(e.target.value)}
                            onChangeEducation = {(e) => setWomanEducation(e.target.value)}
                            onChangeWork = {(e) => setWomanWork(e.target.value)}
                            onChangeEmploymentType = {(e) => setWomanEmploymentType(e.target.value)}
                            onChangeCitizenship = {(e) => setWomanCitizenship(e.target.value)}

                            titularRadioId = "womanTitularRadio"
                            titularRadioValue = "woman"
                            titularChecked = {titular === "woman"}
                            titularOnSelect = {(e) => setTitular(e.target.value)}

                            isFirstNameInvalid = {!validFields.isWomanFirstNameValid}
                            isSecondNameInvalid = {!validFields.isWomanSecondNameValid}
                            isLastNameInvalid = {!validFields.isWomanLastNameValid}
                            isEgnInvalid = {!validFields.isWomanEgnValid}
                            isPhoneInvalid = {!validFields.isWomanPhoneValid}
                            isEducationInvalid = {!validFields.isWomanEducationValid}
                        />
                        <hr />
                    </div>

                    {/* Мъж */}
                    <div className="col-md">
                        <p><strong>Мъж</strong></p>

                        <ParentInput 
                            firstName = {manFirstName} 
                            secondName = {manSecondName} 
                            lastName = {manLastName} 
                            egn = {manEgn}
                            phone = {manPhone}
                            education = {manEducation}
                            work = {manWork}
                            employmentType = {manEmploymentType}
                            citizenship = {manCitizenship}

                            onChangeFirstName = {(e) => setManFirstName(e.target.value)}
                            onChangeSecondName = {(e) => setManSecondName(e.target.value)}
                            onChangeLastName = {(e) => setManLastName(e.target.value)}
                            onChangeEgn = {(e) => setManEgn(e.target.value)}
                            onChangePhone = {(e) => setManPhone(e.target.value)}
                            onChangeEducation = {(e) => setManEducation(e.target.value)}
                            onChangeWork = {(e) => setManWork(e.target.value)}
                            onChangeEmploymentType = {(e) => setManEmploymentType(e.target.value)}
                            onChangeCitizenship = {(e) => setManCitizenship(e.target.value)}

                            titularRadioId = "manTitularRadio"
                            titularRadioValue = "man"
                            titularChecked = {titular === "man"}
                            titularOnSelect = {(e) => setTitular(e.target.value)}

                            isFirstNameInvalid = {!validFields.isManFirstNameValid}
                            isSecondNameInvalid = {!validFields.isManSecondNameValid}
                            isLastNameInvalid = {!validFields.isManLastNameValid}
                            isEgnInvalid = {!validFields.isManEgnValid}
                            isPhoneInvalid = {!validFields.isManPhoneValid}
                            isEducationInvalid = {!validFields.isManEducationValid}
                        />
                        <hr />
                    </div>
                </div>

                <div>
                    <p><strong>За какво дете бихте желали да се грижите</strong></p>
                    <div className="form-row">
                        <div className="form-group col-md">
                            <Select 
                                id="preferKidGender" 
                                label="Предпочитан пол" 
                                placeholder="Избери предпочитан пол ..." 
                                onChange={(e) => setPreferKidGender(e.target.value)} 
                                value={preferKidGender}
                            >
                                <option value="Момче">Момче</option>
                                <option value="Момиче">Момиче</option>
                            </Select>
                        </div>

                        <div className="form-group col-md">
                            <Input 
                                id="preferKidMinAge" 
                                label="Минимална възраст" 
                                type="number" 
                                placeholder="Минимална възраст ..." 
                                onChange={(e) => setPreferKidMinAge(e.target.value)} 
                                value={preferKidMinAge} 
                                isInvalid = {!validFields.isPreferKidMinAgeValid}
                                invalidMessage = "Невалидна стойност."
                            />
                        </div>

                        <div className="form-group col-md">
                            <Input 
                                id="preferKidMaxAge" 
                                label="Максимална възраст" 
                                type="number" 
                                placeholder="Максимална възраст ..." 
                                onChange={(e) => setPreferKidMaxAge(e.target.value)} 
                                value={preferKidMaxAge} 
                                isInvalid = {!validFields.isPreferKidMaxAgeValid}
                                invalidMessage = "Невалидна стойност."
                            />
                        </div>
                    </div>
                    <hr />
                </div>

                <div>
                    <p><strong>За семейството</strong></p>

                    <AddressInput 
                        region = {region}
                        subRegion = {subRegion}
                        city = {city}
                        fullAddress = {true}
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
                        id="language" 
                        label="На какъв език се говори в семейството" 
                        type="text" 
                        placeholder="На какъв език се говори в семейството ..." 
                        value={language} onChange={(e) => setLanguage(e.target.value)} 
                    />

                    <Input 
                        id="levelOfBulgarianLanguage" 
                        label="Владеете ли български език добре?" 
                        type="text" placeholder="Да / не ..." 
                        value={levelOfBulgarianLanguage} onChange={(e) => setLevelOfBulgarianLanguage(e.target.value)} 
                    />

                    <Input 
                        id="religion" 
                        label="Религия" 
                        type="text" 
                        placeholder="Религия ..." 
                        value={religion} 
                        onChange={(e) => setReligion(e.target.value)} 
                    />
                    
                    <Select id="familyType" label="Желая да предоставям приемна грижа като" placeholder="Желая да предоставям приемна грижа като ..." onChange={(e) => setFamilyType(e.target.value)} value={familyType}>
                        <option value="Доброволно приемно семейство">Доброволно приемно семейство</option>
                        <option value="Професионално приемно семейство">Професионално приемно семейство</option>
                    </Select>

                    <Input 
                        id="averageMonthlyIncomePerFamilyMember" 
                        label="Среден месечен доход на член от семейството (в лева)" 
                        type="number" 
                        placeholder="Среден месечен доход на член от семейството (в лева) ..." 
                        value={averageMonthlyIncomePerFamilyMember} onChange={(e) => setAverageMonthlyIncomePerFamilyMember(e.target.value)} 
                        isInvalid = {!validFields.isAverageMonthlyIncomePerFamilyMemberValid}
                        invalidMessage = "Невалидна стойност."
                    />

                    <Input 
                        id="anotherIncome" 
                        label="Доходи от други източници" 
                        type="number" 
                        placeholder="Доходи от други източници ..." 
                        value={anotherIncome} onChange={(e) => setAnotherIncome(e.target.value)} 
                        isInvalid = {!validFields.isAnotherIncomeValid}
                        invalidMessage = "Невалидна стойност."
                    />
                    
                    <Input id="houseType" label="Жилище" type="text" placeholder="Собствено / под наем, брой стаи ..." value={houseType} onChange={(e) => setHouseType(e.target.value)} />
                    <hr />
                </div>

                <div>
                    <p><strong>Социален работник</strong></p>
                    <Input 
                        id="warden" 
                        label="Име" 
                        type="text" 
                        value={warden ? `${warden.first_name} ${warden.second_name} ${warden.last_name}` : ""} 
                        disabled={true} />
                </div>

                <div className="pull-right">
                    {isEditing ?
                        <button type="button" className="btn btn-warning" onClick={update}>Редактирай</button>
                        :
                        <button type="button" className="btn btn-primary" onClick={register}>Регистрирай</button>
                    }

                    <BackButton />
                </div>
            </form>

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default FormComponent;