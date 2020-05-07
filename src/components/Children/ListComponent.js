import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const childrenAreLoading = useSelector(state => state.childrenAreLoading);
    const children = useSelector(state => state.children);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(actions.loadChildren());
    }, [children, dispatch]);

    const viewDetails = (child) => {
        dispatch(actions.setCurrentChild(child))
        history.push(`/child/details/${child.id}`);
    }
    
    const renderChildrenList = () => {
        if(!children) return null;

        return children.map((child) => {
            return (
                <tr key={child.id}>
                    <td>
                        {child.first_name} {child.second_name} {child.last_name}
                    </td>
                    <td>
                        {child.family 
                            && `${child.family.woman.first_name} ${child.family.woman.last_name} и ${child.family.man.first_name} ${child.family.man.last_name}`}
                    </td>
                    <td>
                        <button type="button" className="btn btn-info mr-1 mb-1" onClick={() => { viewDetails(child) }}><i className="fas fa-info-circle"></i></button>
                    </td>
                </tr>
            );
        });
    }

    const remountComponent = () => {
        dispatch(actions.setChildren([]));
    }

    return <>
        <div className="content-list d-flex flex-column">
            <div className="content-list-options d-flex justify-content-between">
                <button className="btn btn-link" onClick={()=>history.push("/child/register")}>Добави дете</button>
                <button className="btn btn-info mb-2" onClick={remountComponent}><i className="fas fa-sync"></i></button>
            </div>
            
            <div className="content-list-results">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Име</th>
                                <th scope="col">Семейство</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderChildrenList()}
                        </tbody>
                    </table>
                </div>
            </div>

            <Loader loading={childrenAreLoading} />
        </div>
    </>;

}

export default ListComponent;