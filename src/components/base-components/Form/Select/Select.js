import React from 'react';

const Select = (props) => {

    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <select id={props.id} className="form-control" onChange={props.onChange} value={props.value}>
                {props.loading ?
                        <option defaultValue>Зареждане ...</option>
                    :
                    <>
                        <option defaultValue>{props.placeholder}</option>
                        {props.children}
                    </>
                }
            </select>
        </div>
    );

}

export default Select;