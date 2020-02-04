import React from 'react';

const Select = (props) => {

    return (
        <div className="form-group">
            <label htmlFor="region">{props.label}</label>
            <select id="region" className="form-control" onChange={props.onChange}>
                <option defaultValue>{props.placeholder}</option>
                {props.children}
            </select>
        </div>
    );

}

export default Select;