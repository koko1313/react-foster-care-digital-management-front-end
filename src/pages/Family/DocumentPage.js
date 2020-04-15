import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import actions from '../../redux/actions';
import FamilyApplication from '../../components/Family/Documents/FamilyApplication';

const DocumentPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { document } = useParams(); // get parameter from url

    const renderDocument = () => {
        switch(document) {
            case "family-application": 
                return <FamilyApplication />;
            default:
                dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерен такъв документ!"}));
                history.goBack();
                break;
        }    
    }

    return renderDocument();

}

export default DocumentPage;