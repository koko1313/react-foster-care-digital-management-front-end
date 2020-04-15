import React from 'react';
import FamilyFormComponent from '../../components/Family/FormComponent';

/**
 * @param {boolean} isEditing 
 */
const FormPage = (props) => {

    return (
        <>
            <h1>Семейство</h1>
            
            <FamilyFormComponent isEditing={props.isEditing} />
        </>
    );

}

export default FormPage;