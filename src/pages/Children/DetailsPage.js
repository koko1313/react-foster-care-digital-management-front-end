import React, { useEffect, useState } from 'react';
import { objectIsEmpty } from '../../helpers';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions';
import networkClient from '../../network/network-client';
import ChildDetailsComponent from '../../components/Children/DetailsComponent';
import Loader from '../../components/base-components/Loader';
import BackButton from '../../components/base-components/BackButton';

const DetailsPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    
    const child = useSelector(state => state.currentChild);

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
        if((!objectIsEmpty(child) && Number(child.id) !== Number(id)) || objectIsEmpty(child)) {
            setIsLoading(true);
            
            networkClient.get(`/child/${id}`, null, 
                (child) => {
                    dispatch(actions.setCurrentChildInRedux(child));
                    setIsLoading(false);
                },
                (error) => {
                    processErrorMessages(error);
                    setIsLoading(false);
                }
            );
        }

        // eslint-disable-next-line
    }, [dispatch, child]);

    const editChild = (child) => {
        history.push(`/child/edit/${child.id}`);
    }

    const deleteChild = () => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        setIsLoading(true);
        
        networkClient.delete(`/child/delete/${child.id}`, null, 
            () => { 
                dispatch(actions.deleteChild(child.id));
                history.push("/child/all");
                setIsLoading(false);
            },
            (error) => {
                processErrorMessages(error);
                setIsLoading(false);
            }
        );
    }

    return <>
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <h1>Дете</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <h2>Детайли</h2>
                    
                    <ChildDetailsComponent child={child} />
                </div>

                <div className="col-md">
                    <h2>Документи</h2>

                    <div className="list-group">
                        {/* <button className="list-group-item list-group-item-action" onClick={() => {history.push(`/family/document/family-application/${family.id}`)}}>Заявление</button> */}
                    </div>
                    
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col">
                    <div className="mt-4 d-flex justify-content-end">
                        <button type="button" className="btn btn-warning mr-1" onClick={() => { editChild(child) }}>Редактирай</button>
                        <button type="button" className="btn btn-danger" onClick={() => { deleteChild() }}>Изтрий</button>
                        <BackButton />
                    </div>
                </div>
            </div>

            <Loader loading={isLoading} fullScreen={true} />
        </div>
    </>;
}

export default DetailsPage;