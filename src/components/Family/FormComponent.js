import React, { useState } from 'react';
import networkClient from '../../network/network-client';
import { Alert } from 'reactstrap';
import Input from '../base-components/Form/Input';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../base-components/Loader';
import Select from '../base-components/Form/Select/Select';
import { useSelector } from 'react-redux';

const FormComponent = () => {

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    const [isLoading, setIsLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [titular, setTutular] = useState("");
    const [womanFirstName, setWomanFirstName] = useState("");
    const [womanSecondName, setWomanSecondName] = useState("");
    const [womanLastName, setWomanLastName] = useState("");
    const [manFirstName, setManFirstName] = useState("");
    const [manSecondName, setManSecondName] = useState("");
    const [manLastName, setManLastName] = useState("");
    const [preferKidGender, setPreferKidGender] = useState("");
    const [preferKidMinAge, setPreferKidMinAge] = useState("");
    const [preferKidMaxAge, setPreferKidMaxAge] = useState("");
    const [wardenId, setWardenId] = useState("");

    const [warden, setWarden] = useState();

    const { id } = useParams(); // get parameter from url
    const history = useHistory();
    const loggedUser = useSelector(state => state.loggedUser); // get logged user, it have to be EmployeeOEPG

    useState(() => {
        if(id) {
            setIsEditing(true);
            setIsLoading(true);

            networkClient.get(`/family/${id}`, null, (family) => {
                setTutular(family.titular);
                setWomanFirstName(family.woman_first_name);
                setWomanSecondName(family.woman_second_name);
                setWomanLastName(family.woman_last_name);
                setManFirstName(family.man_first_name);
                setManSecondName(family.man_second_name);
                setManLastName(family.man_last_name);
                setPreferKidGender(family.prefer_kid_gender);
                setPreferKidMinAge(family.prefer_kid_min_age);
                setPreferKidMaxAge(family.prefer_kid_max_age);
                setWardenId(family.warden.id);

                setWarden(family.warden); // when editing, warden is family warden

                setIsLoading(false);
            });
        } else {
            setWardenId(loggedUser.id);
            setWarden(loggedUser); // when registering family, warden is current logged user
        }     
    }, [id]);
    

    const register = () => {
        setIsLoading(true);
        networkClient.post("/family/register", 
            {
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
                wardenId: wardenId,
            },
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно регистрирано семейство!"});
                history.push("/family/all");
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
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

    const update = () => {
        setIsLoading(true);
        networkClient.put(`/family/update/${id}`, 
            {
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
                wardenId: wardenId,
            },
            // success
            (response) => {
                setAlert({color: "success", message: "Успешно редактирано семейство!"});
                history.push("/family/all");
            },
            // error
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
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
                <Input id="titular" label="Титуляр" type="text" placeholder="Титуляр ..." required={true} onChange={(e) => setTutular(e.target.value)} value={titular} />

                <div className="form-row">
                    <div className="form-group col-md">
                        <Input id="womanFirstName" label="Име на жената" type="text" placeholder="Име на жената ..." required={true} onChange={(e) => setWomanFirstName(e.target.value)} value={womanFirstName} />
                    </div>
                    <div className="form-group col-md">
                        <Input id="womanSecondName" label="Презиме на жената" type="text" placeholder="Презиме на жената ..." required={true} onChange={(e) => setWomanSecondName(e.target.value)} value={womanSecondName} />
                    </div>
                    <div className="form-group col-md">
                        <Input id="womanLastName" label="Фамилия на жената" type="text" placeholder="Фамилия на жената ..." required={true} onChange={(e) => setWomanLastName(e.target.value)} value={womanLastName} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md">
                        <Input id="manFirstName" label="Име на мъжа" type="text" placeholder="Име на мъжа ..." required={true} onChange={(e) => setManFirstName(e.target.value)} value={manFirstName} />
                    </div>
                    <div className="form-group col-md">
                        <Input id="manSecondName" label="Презиме на мъжа" type="text" placeholder="Презиме на мъжа ..." required={true} onChange={(e) => setManSecondName(e.target.value)} value={manSecondName} />
                    </div>
                    <div className="form-group col-md">
                        <Input id="manLastName" label="Фамилия на мъжа" type="text" placeholder="Фамилия на мъжа ..." required={true} onChange={(e) => setManLastName(e.target.value)} value={manLastName} />
                    </div>
                </div>

                <Select id="preferKidGender" label="Предпочитан пол на децата" placeholder="Избери предпочитан пол ..." onChange={(e) => setPreferKidGender(e.target.value)} value={preferKidGender}>
                    <option value="m">Момче</option>
                    <option value="f">Момиче</option>
                </Select>

                <div className="form-row">
                    <div className="form-group col-md">
                        <Input id="preferKidMinAge" label="Минимална възраст" type="number" placeholder="Минимална възраст ..." onChange={(e) => setPreferKidMinAge(e.target.value)} value={preferKidMinAge} />
                    </div>
                    <div className="form-group col-md">
                        <Input id="preferKidMaxAge" label="Максимална възраст" type="number" placeholder="Максимална възраст ..." onChange={(e) => setPreferKidMaxAge(e.target.value)} value={preferKidMaxAge} />
                    </div>
                </div>

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