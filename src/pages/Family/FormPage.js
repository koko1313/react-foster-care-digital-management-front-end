import React from 'react';
import FamilyFormComponent from '../../components/Family/FormComponent';

/**
 * @param {boolean} isEditing 
 */
const FormPage = (props) => {

    return <>
        <div className="row">
            <div className="col">
                <h1>Семейство</h1>
            </div>
        </div>
        
        <div className="row">
            <div className="col">
                <FamilyFormComponent isEditing={props.isEditing} />
            </div>
        </div>
    </>;
}

export default FormPage;