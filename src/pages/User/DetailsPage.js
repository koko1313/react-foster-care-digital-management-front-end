import React from 'react';
import LoggedUserDetails from '../../components/Session/LoggedUserDetails';

const DetailsPage = () => {

    return <>
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <LoggedUserDetails />
                </div>
            </div>
        </div>
    </>;
}

export default DetailsPage;