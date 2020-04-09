import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * @param {Object} family 
 * @returns List of family's children
 */
const OwnChildrenList = (props) => {
    const history = useHistory();

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

    return (
        <ul className="family-children-list">
            {renderChildrenList()}

            <li 
                className = "child-item child-add" 
                onClick = {() => {history.push(`/child/register`)}}>
                    Добави дете
            </li>
        </ul>
    );
}

export default OwnChildrenList;