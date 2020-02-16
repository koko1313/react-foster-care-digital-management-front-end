import React from 'react';

/**
 * @param {string} id
 * @param {string} label
 * @param {string} type
 * @param {string} placeholder
 * @param {string} value
 * @param {function} onChange
 * @param {bool} required
 * @param {bool} disabled
 * 
 * @param {bool} isInvalid
 * @param {string} invalidMessage
 */
const Input = (props) => {

    const ifRequired = () => {
        if(props.required === true) {
            return <span className="text-danger"> *</span>
        }
    }

    return (
        <div className="form-group">
            <label htmlFor={props.id}>
                {props.label}
                {ifRequired()}
            </label>

            <input 
                type={props.type} 
                className={`form-control ${props.isInvalid ? "is-invalid" : ""}`} 
                id={props.id} 
                placeholder={props.placeholder} 
                onChange={props.onChange} 
                value={props.value}
                disabled={props.disabled ? true : false}
            />

            {props.isInvalid &&
                <div className="invalid-feedback">
                    {props.invalidMessage ?
                        props.invalidMessage
                        :
                        "Полето трябва да бъде попълнено."
                    }
                </div>
            }
        </div>
    );

}

export default Input;