import React from 'react';

const Input = (props) => {

    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} className="form-control" id={props.id} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
        </div>
    );

}

export default Input;