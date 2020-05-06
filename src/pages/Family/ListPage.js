import React from 'react';
import FamilyListComponent from '../../components/Family/ListComponent';

const FamilyListPage = () => {

    return <>
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <h1>Семейства</h1>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <FamilyListComponent />
                </div>
            </div>
        </div>
    </>;
}

export default FamilyListPage;