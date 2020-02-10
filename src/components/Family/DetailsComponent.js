import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DetailsComponent = () => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams(); // get parameter from url

    useState(() => {
        if(id) {
            
        }
    }, [id]);

    return (
        <>
            {id}
        </>
    );

}

export default DetailsComponent;