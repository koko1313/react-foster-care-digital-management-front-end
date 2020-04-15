import React, { useEffect, useState } from 'react';
import networkClient from '../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const children = useSelector(state => state.children);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=> {
        if(children.length === 0) {
            setIsLoading(true);
            
            networkClient.get('/child/all', null, 
                (children) => {
                    dispatch(actions.setChildren(children));
                    setIsLoading(false);
                },
                (error) => {
                    if(error.response) {
                        switch(error.response.status) {
                            case 401:
                                dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                                dispatch(actions.deleteLoggedUser());
                                break;
                            default:
                                dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                                break;
                        }
                    } else {
                        dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
                    }
                    setIsLoading(false);
                }
            );
        }
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
                        <button type="button" className="btn btn-info mr-1 mb-1" onClick={() => { viewDetails(child) }}><i className="fa fa-info-circle"></i></button>
                    </td>
                </tr>
            );
        });
    }

    const remountComponent = () => {
        dispatch(actions.setChildren([]));
    }

    return (
        <>
            <button className="btn btn-link" onClick={()=>history.push("/child/register")}>Добави дете</button>
            <button className="btn btn-info pull-right mb-2" onClick={remountComponent}><i className="fa fa-refresh"></i></button>
            
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

            <Loader loading={isLoading} />
        </>
    );

}

export default ListComponent;