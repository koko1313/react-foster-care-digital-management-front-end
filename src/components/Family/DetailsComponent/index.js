import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import networkClient from '../../../network/network-client';
import actions from '../../../redux/actions';
import Loader from '../../base-components/Loader';
import BackButton from '../../base-components/BackButton';
import './style.scss';

const DetailsComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [family, setFamily] = useState();

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams(); // get parameter from url

    useEffect(() => {
        setIsLoading(true);
        
        networkClient.get(`/family/${id}`, null, 
            (family) => {
                setFamily(family)
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
        ).finally(() => {
            setIsLoading(false);
        });
    }, [id, dispatch, history]);

    const editFamily = (id) => {
        history.push(`/family/edit/${id}`);
    }

    const deleteFamily = (id) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        setIsLoading(true);
        
        networkClient.delete(`/family/delete/${id}`, null, 
            () => { 
                dispatch(actions.deleteFamily(id));
                history.push("/family/all");
            },
            (error) => {
                if(error.response) {
                    switch(error.response.status) {
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
        ).finally(() => { 
            setIsLoading(false);
        });
    }

    const renderFamilyInformation = () => {
        if(!family) return;

        return (
            <>
                {/* Жена */}
                {family.woman &&
                    <div className="info-section">
                        <div className="row">
                            <div className="col-md-3 info-header info-heading">Жена</div>
                            <div className="col info-body"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Име</div>
                            <div className="col info-body">
                                {family.woman.first_name} {family.woman.second_name} {family.woman.last_name}
                                {family.titular === "woman" && " (титуляр)"}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">ЕГН</div>
                            <div className="col info-body">{family.woman.egn}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Телефон</div>
                            <div className="col info-body">{family.woman.phone}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Образование</div>
                            <div className="col info-body">{family.woman.education}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Месторабота</div>
                            <div className="col info-body">{family.woman.work}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Трудова заетост</div>
                            <div className="col info-body">{family.woman.employment_type}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Гражданство</div>
                            <div className="col info-body">{family.woman.citizenship}</div>
                        </div>
                    </div>
                }

                {/* Мъж */}
                {family.man &&
                    <div className="info-section">
                        <div className="row">
                            <div className="col-md-3 info-header info-heading">Мъж</div>
                            <div className="col info-body"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header info-header">Име</div>
                            <div className="col info-body">
                                {family.man.first_name} {family.man.second_name} {family.man.last_name}
                                {family.titular === "man" && " (титуляр)"}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">ЕГН</div>
                            <div className="col info-body">{family.man.egn}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Телефон</div>
                            <div className="col info-body">{family.man.phone}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Образование</div>
                            <div className="col info-body">{family.man.education}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Месторабота</div>
                            <div className="col info-body">{family.man.work}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Трудова заетост</div>
                            <div className="col info-body">{family.man.employment_type}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Гражданство</div>
                            <div className="col info-body">{family.man.citizenship}</div>
                        </div>
                    </div>
                }

                {/* Предпочитания към децата */}
                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Предпочитания към деца</div>
                        <div className="col info-body"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Предпочитан пол</div>
                        <div className="col info-body">
                            {family.prefer_kid_gender === "m" && "Момче"}
                            {family.prefer_kid_gender === "f" && "Момиче"}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Предпочитана възраст</div>
                        <div className="col info-body">
                            Минимална: {family.prefer_kid_min_age} <br />
                            Максимална: {family.prefer_kid_max_age}
                        </div>
                    </div>
                </div>

                {/* За семейството */}
                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">За семейството</div>
                        <div className="col info-body"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Адрес</div>
                        <div className="col info-body">
                            {family.region && family.region.name + ", "}
                            {family.sub_region && family.sub_region.name + ", "}
                            {family.city && family.city.name + ", "} 
                            {family.address}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Ниво на български език</div>
                        <div className="col info-body">{family.level_of_bulgarian_language}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Религия</div>
                        <div className="col info-body">{family.religion}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Среден месечен доход на член от семейството</div>
                        <div className="col info-body">{family.average_monthly_income_per_family_member} лв</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Доходи от други източници</div>
                        <div className="col info-body">{family.another_income} лв</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Тип на приемното семейство</div>
                        <div className="col info-body">{family.family_type}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Жилище</div>
                        <div className="col info-body">{family.house_type}</div>
                    </div>
                </div>

                <div className="row pull-right">
                    <button type="button" className="btn btn-warning mr-1" onClick={() => { editFamily(family.id) }}>Редактирай</button>
                    <button type="button" className="btn btn-danger" onClick={() => { deleteFamily(family.id) }}>Изтрий</button>
                    <BackButton />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container mt-5">
                {renderFamilyInformation()}
            </div>
            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default DetailsComponent;