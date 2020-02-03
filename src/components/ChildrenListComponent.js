import React, { useEffect } from 'react';
import { objectIsEmpty } from '../helpers';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../redux/actions";

const ChildrenListComponent = () => {

    const loggedUser = useSelector(state => state.loggedUser);
    const children = useSelector(state => state.children);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getChildren());
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour
    
    const renderChildrenList = () => {
        if(objectIsEmpty(loggedUser)) return null;

        return children.map((child, index) => {
            return (
                <tr key={index}>
                    <td>{child.egn}</td>
                    <td>{child.first_name} {child.second_name} {child.last_name}</td>
                    <td>{child.sex}</td>
                </tr>
            )
        });
    }

    return <>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ЕГН</th>
                    <th scope="col">Име</th>
                    <th scope="col">Пол</th>
                </tr>
            </thead>
            <tbody>
                {renderChildrenList()}
            </tbody>
        </table>
    </>;
}

export default ChildrenListComponent;