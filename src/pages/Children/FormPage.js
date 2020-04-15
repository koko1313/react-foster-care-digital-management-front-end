import React from 'react';
import ChildFormComponent from '../../components/Children/FormComponent';

/**
 * @param {boolean} isEditing 
 */
const FormPage = (props) => {

    return (
        <>
            <h1>Дете</h1>
            
            <ChildFormComponent isEditing={props.isEditing}/>
        </>
    );

}

export default FormPage;