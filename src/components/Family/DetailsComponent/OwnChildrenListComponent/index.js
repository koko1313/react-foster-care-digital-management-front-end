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
                <button 
                    key = {child.id}
                    className = "list-group-item list-group-item-action" 
                    onClick = {() => {history.push(`/child/details/${child.id}`)}}>
                        {child.first_name} {child.second_name} {child.last_name}
                </button>
            );
        });
    }

    return (
        <div className="list-group">
            {renderChildrenList()}

            <button 
                className = "list-group-item list-group-item-action list-group-item-light" 
                onClick = {() => {history.push(`/child/register`)}}>
                    Добави дете
            </button>
        </div>
    );
}

export default OwnChildrenList;