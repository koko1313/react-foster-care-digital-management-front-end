import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'reactstrap';
import AddChildToFamilyComponent from './AddChildToFamilyComponent';

/**
 * @param {Object} family 
 * @returns List of family's children
 */
const OwnChildrenList = (props) => {
    const history = useHistory();

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    // If adding child, this flag will be set to true
    const [isAddingChild, setIsAddingChild] = useState();

    const renderChildrenList = () => {
        if(!props.family) return null;
        if(props.family.children.length === 0) return null;

        return props.family.children.map((child) => {
            return (
                <li key={child.id} className="row child-item">
                    <div 
                        className = "col child-name" 
                        onClick = {() => {history.push(`/child/details/${child.id}`)}}>
                            {child.first_name} {child.second_name} {child.last_name}
                    </div>
                    <div className="col-3 child-remove"><i className="fa fa-user-times"></i></div>
                </li>
            );
        });
    }

    const renderAddChildButton = () => {
        if(isAddingChild) {
            return (
                <li className="child-item child-add-select-item" >
                    <AddChildToFamilyComponent 
                        setAlert = {setAlert}
                        closeFunction = {() => {setIsAddingChild(false)}} />
                </li>
            );
        }

        return (
            <li 
                className = "child-item child-add-button-item" 
                onClick = {() => {setIsAddingChild(true)}}>
                    Добави дете
            </li>
        );
    }

    return (
        <>
            <Alert color={alert.color} isOpen={alert.message ? true : false} toggle={onDismiss}>
                {alert.message}
            </Alert>

            <ul className="family-children-list">
                {renderChildrenList()}

                {renderAddChildButton()}
            </ul>
        </>
    );
}

export default OwnChildrenList;