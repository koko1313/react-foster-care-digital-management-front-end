import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <button type="button" className="btn btn-light mx-1" onClick={goBack}>Назад</button>
    );

}

export default BackButton;