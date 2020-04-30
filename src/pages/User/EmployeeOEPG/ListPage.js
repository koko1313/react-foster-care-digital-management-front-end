import React from 'react';
import EmployeeOEPGListComponent from '../../../components/EmployeeOEPG/ListComponent';

const ListPage = () => {

    return <>
        <div className="row">
            <div className="col">
                <h1>Потребители ОЕПГ</h1>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <EmployeeOEPGListComponent />
            </div>
        </div>
    </>;
}

export default ListPage;