import React from 'react';
import { objectIsEmpty } from '../helpers';

import { useSelector } from 'react-redux';

const HomePage = () => {

    const loggedUser = useSelector(state => state.loggedUser);
    
    const onlyAdminCanSeeThis = () => {
        if(!objectIsEmpty(loggedUser)) {
            if(loggedUser.roles.includes("ROLE_ADMIN")) {
                return <div className="alert alert-danger">Only admins can see this!</div>
            }
        }
    }

    const onlyRegionalAdminsCanSeeThis = () => {
        if(!objectIsEmpty(loggedUser)) {
            if(loggedUser.roles.includes("ROLE_REGIONAL_ADMIN")) {
                return <div className="alert alert-warning">Only regional admins can see this!</div>
            }
        }
    }

    return <>
        {onlyAdminCanSeeThis()}
        {onlyRegionalAdminsCanSeeThis()}
    </>;
}

export default HomePage;