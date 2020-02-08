import React from 'react';

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
            />
        </div>
    );

}

export default Input;