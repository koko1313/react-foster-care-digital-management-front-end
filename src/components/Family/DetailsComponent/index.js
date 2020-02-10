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
                <div className="row info">
                    <div className="col-md-3 info-header">Жена</div>
                    <div className="col info-body">
                        {family.woman_first_name} {family.woman_second_name} {family.woman_last_name}
                        {family.titular === "woman" && " (титуляр)"}
                    </div>
                </div>
                <div className="row info">
                    <div className="col-md-3 info-header">Мъж</div>
                    <div className="col info-body">
                        {family.man_first_name} {family.man_second_name} {family.man_last_name}
                        {family.titular === "man" && " (титуляр)"}
                    </div>
                </div>
                <div className="row info">
                    <div className="col-md-3 info-header">Предпочитан пол на децата</div>
                    <div className="col info-body">
                        {family.prefer_kid_gender === "m" && "Момче"}
                        {family.prefer_kid_gender === "f" && "Момиче"}
                    </div>
                </div>
                <div className="row info">
                    <div className="col-md-3 info-header">Предпочитана възраст на децата</div>
                    <div className="col info-body">
                        Минимална: {family.prefer_kid_min_age} <br />
                        Максимална: {family.prefer_kid_max_age}
                    </div>
                </div>
                <div className="row info">
                    <div className="col-md-3 info-header">Адрес</div>
                    <div className="col info-body">
                        {family.region && family.region.name + ", "}
                        {family.sub_region && family.sub_region.name + ", "}
                        {family.city && family.city.name + ", "} 
                        {family.address}
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
            <div className="mt-5">
            {renderFamilyInformation()}
            </div>
            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default DetailsComponent;