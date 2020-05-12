import React, { ChangeEventHandler } from 'react';

interface Props {
    label: string;
    required: boolean;
    firstName: string;
    secondName: string;
    lastName: string;
    onChangeFirstName: ChangeEventHandler;
    onChangeSecondName: ChangeEventHandler;
    onChangeLastName: ChangeEventHandler;
    isFirstNameInvalid: boolean;
    isSecondNameInvalid: boolean;
    isLastNameInvalid: boolean;
    invalidMessage: string;
}

const NamesInput = (props: Props) => {

    const ifRequired = () => {
        if(props.required === true) {
            return <span className="text-danger"> *</span>
        }
    }

    return (
        <div className="form-group">
            <label>
                {props.label}
                {ifRequired()}
            </label>

            <div className="input-group">
                <input 
                    type = "text" 
                    className = {`form-control ${props.isFirstNameInvalid ? "is-invalid" : ""}`} 
                    placeholder = "Име ..." 
                    onChange = {props.onChangeFirstName} 
                    value = {props.firstName}
                />

                <input 
                    type = "text" 
                    className = {`form-control ${props.isSecondNameInvalid ? "is-invalid" : ""}`} 
                    placeholder = "Презиме ..." 
                    onChange = {props.onChangeSecondName} 
                    value = {props.secondName} 
                />

                <input 
                    type = "text" 
                    className = {`form-control ${props.isLastNameInvalid ? "is-invalid" : ""}`} 
                    placeholder = "Фамилия ..." 
                    onChange = {props.onChangeLastName} 
                    value = {props.lastName} 
                />

                {(props.isFirstNameInvalid || props.isSecondNameInvalid || props.isLastNameInvalid) &&
                    <div className="invalid-feedback">
                        {props.invalidMessage ?
                            props.invalidMessage
                            :
                            "Полетата трябва да бъдат попълнени."
                        }
                    </div>
                }
            </div>

            
        </div>
    );

}

export default NamesInput;