import React from 'react';
import ChildFormComponent from '../../components/Children/FormComponent';

/**
 * @param {boolean} isEditing 
 */
const FormPage = (props) => {

    return <>
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <h1>Дете</h1>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <ChildFormComponent isEditing={props.isEditing} />
                </div>
            </div>
        </div>
    </>;
}

export default FormPage;