import React, { useEffect, useState } from 'react';
import networkClient from '../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const families = useSelector(state => state.families);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsLoading(true);
        
        networkClient.get('/family/all', null, (families) => {
            dispatch(actions.setFamilies(families));
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    const editFamily = (id) => {
        history.push(`/family/edit/${id}`);
    }

    const deleteFamily = (id) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        setIsLoading(true);
        
        networkClient.delete(`/family/delete/${id}`, null, 
        // success
        () => { dispatch(actions.deleteFamily(id)) },
        // error
        () => { console.log("err") })
        // finally
        .finally(() => { 
            setIsLoading(false);
        });
    }
    
    const renderFamiliesList = () => {
        if(!families) return null;

        return families.map((family) => {
            return (
                <tr key={family.id}>
                    <td>{`${family.woman_first_name} ${family.woman_second_name} ${family.woman_last_name}`}</td>
                    <td>{`${family.man_first_name} ${family.man_second_name} ${family.man_last_name}`}</td>
                    <td>{family.prefer_kid_gender}</td>
                    <td>{`${family.prefer_kid_min_age} - ${family.prefer_kid_max_age}`}</td>
                    <td>
                        <button type="button" className="btn btn-warning mr-1" onClick={() => { editFamily(family.id) }}><i className="fa fa-edit"></i></button>
                        <button type="button" className="btn btn-danger" onClick={() => { deleteFamily(family.id) }}><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <button className="btn btn-link" onClick={()=>history.push("/family/register")}>Добави семейство</button>
            
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Име на жената</th>
                            <th scope="col">Име на мъжа</th>
                            <th scope="col">Предпочитан пол</th>
                            <th scope="col">Предпочитана възраст</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderFamiliesList()}
                    </tbody>
                </table>
            </div>

            <Loader loading={isLoading} />
        </>
    );

}

export default ListComponent;