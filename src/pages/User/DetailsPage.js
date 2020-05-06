import React from 'react';
import LoggedUserDetails from '../../components/Session/LoggedUserDetails';

const DetailsPage = () => {

    return <>
        <div className="row">
            <div className="col content-container">
                <LoggedUserDetails />
            </div>
        </div>
    </>;
}

export default DetailsPage;