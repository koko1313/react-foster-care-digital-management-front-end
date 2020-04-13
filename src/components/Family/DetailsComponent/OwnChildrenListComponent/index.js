import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import AddChildToFamilyComponent from './AddChildToFamilyComponent';

const OwnChildrenListComponent = () => {
    const history = useHistory();

    const [alert, setAlert] = useState({color: null, message: null});
    const onDismiss = () => setAlert({color: null, message: null});

    // If adding child, this flag will be set to true
    const [isAddingChild, setIsAddingChild] = useState();
    
    const family = useSelector(state => state.currentFamily);

    const renderChildrenList = () => {
        if(!family) return;
        if(!family.children) return;

        return family.children.map((child) => {
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

export default OwnChildrenListComponent;