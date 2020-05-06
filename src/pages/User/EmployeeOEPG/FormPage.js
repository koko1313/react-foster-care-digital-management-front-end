import React from 'react';
import EmployeeOEPGFormComponent from '../../../components/EmployeeOEPG/FormComponent';

const FormPage = () => {

    return <>
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <h1>Потребител ОЕПГ</h1>
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <EmployeeOEPGFormComponent />
                </div>
            </div>
        </div>
    </>;
}

export default FormPage;