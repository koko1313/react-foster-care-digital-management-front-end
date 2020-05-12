import React, { ChangeEventHandler } from 'react';

interface Props {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    invalidMessage?: string;
    onChange: ChangeEventHandler;
    required: boolean;
    isInvalid: boolean;
    loading: boolean;
    children: React.ReactNode;
}

const Select = (props: Props) => {

    const ifRequired = () => {
        if(props.required === true) {
            return <span className="text-danger"> *</span>
        }
    }

    return <>
        <div className="form-group">
            <label htmlFor={props.id}>
                {props.label}
                {ifRequired()}
            </label>
            <select 
                id = {props.id} 
                className = {`form-control ${props.isInvalid ? "is-invalid" : ""}`} 
                onChange = {props.onChange} 
                value = {props.value}
            >
                {props.loading ?
                        <option value="">Зареждане ...</option>
                    :
                    <>
                        <option value="">{props.placeholder}</option>
                        {props.children}
                    </>
                }
            </select>

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
    </>;

}

export default Select;