import React, { ChangeEventHandler } from 'react';

interface Props {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler;
    required: boolean;
    disabled?: boolean;
    isInvalid: boolean;
    invalidMessage?: string;
}

const Input = (props: Props) => {

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