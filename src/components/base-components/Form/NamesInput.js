import React from 'react';

/**
 * @param {string} label
 * @param {bool} required
 * @param {string} firstName
 * @param {string} secondName
 * @param {string} lastName
 * @param {function} onChangeFirstName
 * @param {function} onChangeSecondName
 * @param {function} onChangeLastName
 * 
 * @param {bool} isFirstNameInvalid
 * @param {bool} isSecondNameInvalid
 * @param {bool} isLastNameInvalid
 * @param {string} invalidMessage
 */
const NamesInput = (props) => {

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