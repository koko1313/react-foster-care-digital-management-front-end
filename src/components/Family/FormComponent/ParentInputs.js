import React from 'react';
import NamesInput from '../../base-components/Form/NamesInput';
import Input from '../../base-components/Form/Input';

/**
 * @param {string} titularRadioId
 * @param {string} titularRadioValue
 * @param {bool} titularChecked
 * @param {function} titularOnChange
 * 
 * @param {bool} required
 * @param {string} firstName
 * @param {string} secondName
 * @param {string} lastName
 * @param {string} egn
 * @param {string} phone
 * @param {string} education
 * @param {string} work
 * @param {string} employmentType
 * @param {string} citizenship
 * @param {function} onChangeFirstName
 * @param {function} onChangeSecondName
 * @param {function} onChangeLastName
 * @param {function} onChangeEgn
 * @param {function} onChangePhone
 * @param {function} onChangeEducation
 * @param {function} onChangeWork
 * @param {function} onChangeEmploymentType
 * @param {function} onChangeEmploymentType
 * @param {function} onChangeCitizenship
 */
const ParentInput = (props) => {

    return (
        <>
            <div className="form-check">
                <input 
                    id = {props.titularRadioId} 
                    type = "radio" 
                    name = "titular" 
                    value = {props.titularRadioValue} 
                    onChange = {props.titularOnSelect}
                    checked = {props.titularChecked}
                    className = "form-check-input"
                    />
                <label className="form-check-label" htmlFor={props.titularRadioId}><small>Титуляр</small></label>
            </div>

            <NamesInput 
                label = "Имена" 
                required = {true} 
                firstName = {props.firstName} 
                secondName = {props.secondName} 
                lastName = {props.lastName} 
                onChangeFirstName = {props.onChangeFirstName}
                onChangeSecondName = {props.onChangeSecondName}
                onChangeLastName = {props.onChangeLastName}
            />

            <Input label="ЕГН" type="number" placeholder="ЕГН ..." value={props.egn} onChange={props.onChangeEgn} required={true} />
            <Input label="Телефон" type="number" placeholder="Телефон ..." value={props.phone} onChange={props.onChangePhone} required={true} />
            <Input label="Образование" type="text" placeholder="Образование ..." value={props.education} onChange={props.onChangeEducation} required={true} />
            <Input label="Месторабота" type="text" placeholder="Месторабота ..." value={props.work} onChange={props.onChangeWork} />
            <Input label="Трудова заетост" type="text" placeholder="Трудов договор, граждански договор, безработен, пенсионер ..." value={props.employmentType} onChange={props.onChangeEmploymentType} />
            <Input label="Гражданство" type="text" placeholder="Гражданство ..." value={props.citizenship} onChange={props.onChangeCitizenship} />
        </>
    );

}

export default ParentInput;