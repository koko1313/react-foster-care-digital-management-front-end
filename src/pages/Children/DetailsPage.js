import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actions from '../../redux/actions';
import networkClient from '../../network/network-client';
import ChildDetailsComponent from '../../components/Children/DetailsComponent';
import Loader from '../../components/base-components/Loader';
import BackButton from '../../components/base-components/BackButton';

const DetailsPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [child, setChild] = useState();

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams(); // get parameter from url

    const processErrorMessages = (error) => {
        if(error.response) {
            switch(error.response.status) {
                case 401:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                    dispatch(actions.deleteLoggedUser());
                    break;
                case 404:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерено такова дете!"}));
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
        setIsLoading(true);
        
        networkClient.get(`/child/${id}`, null, 
            (child) => {
                setChild(child);
                setIsLoading(false);
            },
            (error) => {
                processErrorMessages(error);
                setIsLoading(false);
            }
        );

        // eslint-disable-next-line
    }, []);

    const editChild = (id) => {
        history.push(`/child/edit/${id}`);
    }

    const deleteChild = (id) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        setIsLoading(true);
        
        networkClient.delete(`/child/delete/${id}`, null, 
            () => { 
                dispatch(actions.deleteChild(id));
                history.push("/child/all");
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
            <h1>Дете</h1>

            <div className="row">
                <div className="col-md-8">
                    <ChildDetailsComponent child={child} />
                </div>

                <div className="col-md">
                    <h2>Документи</h2>

                    <div className="list-group">
                        {/* <button className="list-group-item list-group-item-action" onClick={() => {history.push(`/family/document/family-application/${family.id}`)}}>Заявление</button> */}
                    </div>
                    
                </div>
            </div>

            <div className="pull-right mt-4">
                <button type="button" className="btn btn-warning mr-1" onClick={() => { editChild(child.id) }}>Редактирай</button>
                <button type="button" className="btn btn-danger" onClick={() => { deleteChild(child.id) }}>Изтрий</button>
                <BackButton />
            </div>

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default DetailsPage;