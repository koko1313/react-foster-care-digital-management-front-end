import React from 'react';

const Select = (props) => {

    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <select id={props.id} className="form-control" onChange={props.onChange} value={props.value}>
                {props.loading ?
                        <option defaultValue value="">Зареждане ...</option>
                    :
                    <>
                        <option defaultValue value="">{props.placeholder}</option>
                        {props.children}
                    </>
                }
            </select>
        </div>
    );

}

export default Select;