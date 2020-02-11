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
                className="form-control" 
                id={props.id} 
                placeholder={props.placeholder} 
                onChange={props.onChange} 
                value={props.value}
                disabled={props.disabled ? true : false}
            />
        </div>
    );

}

export default Input;