import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/base-components/Loader';
import actions from '../../redux/actions';
import networkClient from '../../network/network-client';
import FamilyApplication from '../../components/Family/Documents/FamilyApplication';

const DocumentPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [family, setFamily] = useState();

    const dispatch = useDispatch();
    const history = useHistory();

    const { document, id } = useParams(); // get parameter from url

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
                setFamily(family)
            },
            (error) => {
                processErrorMessages(error);
            }
        ).finally(() => {
            setIsLoading(false);
        });

        // eslint-disable-next-line
    }, []);

    const renderDocument = () => {
        if(!family) return;

        switch(document) {
            case "family-application": 
                return <FamilyApplication family={family} />;
            default:
                dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерен такъв документ!"}));
                history.goBack();
                break;
        }    
    }

    return (
        <>
            {renderDocument()}

            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default DocumentPage;