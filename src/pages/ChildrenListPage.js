import React, { useEffect } from 'react';
import { objectIsEmpty } from '../helpers';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../redux/actions";

const ChildrenListPage = () => {

    const loggedUser = useSelector(state => state.loggedUser);
    const children = useSelector(state => state.children);

    const dispatch = useDispatch();

    useEffect(() => {
        if(children.length === 0) {
            dispatch(actions.getChildren());
        }
    });
    
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

export default ChildrenListPage;