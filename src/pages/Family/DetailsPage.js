import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions';
import networkClient from '../../network/network-client';
import FamilyDetailsComponent from '../../components/Family/DetailsComponent';
import Loader from '../../components/base-components/Loader';
import BackButton from '../../components/base-components/BackButton';
import OwnChildrenListComponent from '../../components/Family/DetailsComponent/OwnChildrenListComponent';

const DetailsPage = () => {

    const [isLoading, setIsLoading] = useState(false);

    const family = useSelector(state => state.currentFamily);

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
        setIsLoading(true);
        
        networkClient.get(`/family/${id}`, null, 
            (family) => {
                dispatch(actions.setCurrentFamily(family));
                setIsLoading(false);
            },
            (error) => {
                processErrorMessages(error);
                setIsLoading(false);
            }
        );

        // eslint-disable-next-line
    }, []);

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
            <h1>Семейство</h1>

            <div className="row">

                <div className="col-md-8">
                    <FamilyDetailsComponent />
                </div>

                <div className="col-md">
                    <div className="row">
                        <div className="col">
                            <h2>Документи</h2>

                            <div className="list-group">
                                <button className="list-group-item list-group-item-action" onClick={() => {history.push(`/family/document/family-application/${family.id}`)}}>Заявление</button>
                            </div>
                        </div>
                    </div>
                    
                    <hr />

                    <div className="row">
                        <div className="col">
                            <h2>Деца</h2>

                            <OwnChildrenListComponent />
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <div className="pull-right mt-4">
                <button type="button" className="btn btn-warning mr-1" onClick={() => { editFamily(family.id) }}>Редактирай</button>
                <button type="button" className="btn btn-danger" onClick={() => { deleteFamily(family.id) }}>Изтрий</button>
                <BackButton />
            </div>

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default DetailsPage;