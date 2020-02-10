import React from 'react';

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
                {props.includeTitularSelect &&
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input 
                                type="radio" 
                                name={props.name} 
                                id={props.id} 
                                value={props.value} 
                                onChange={props.onSelect}
                                checked = {props.checked}
                                />
                            <label className="form-check-label" htmlFor={props.id}><small>Титуляр</small></label>
                        </div>
                    </div>
                }
                <input type="text" className="form-control" placeholder="Име ..." onChange={props.onChangeFirstName} value={props.firstName} />
                <input type="text" className="form-control" placeholder="Презиме ..." onChange={props.onChangeSecondName} value={props.secondName} />
                <input type="text" className="form-control" placeholder="Фамилия ..." onChange={props.onChangeLastName} value={props.lastName} />
            </div>
        </div>
    );

}

export default NamesInput;