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
        
        networkClient.get('/family/all', null, 
            (families) => {
                dispatch(actions.setFamilies(families));
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
            }
        ).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    const editFamily = (id) => {
        history.push(`/family/edit/${id}`);
    }

    const viewDetails = (id) => {
        history.push(`/family/details/${id}`);
    }

    const deleteFamily = (id) => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }

        setIsLoading(true);
        
        networkClient.delete(`/family/delete/${id}`, null, 
            () => { 
                dispatch(actions.deleteFamily(id));
                history.push("/family/all");
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
            }
        ).finally(() => { 
            setIsLoading(false);
        });
    }
    
    const renderFamiliesList = () => {
        if(!families) return null;

        return families.map((family) => {
            return (
                <tr key={family.id}>
                    <td>
                        {family.titular === "woman" &&
                            `${family.woman_first_name} ${family.woman_second_name} ${family.woman_last_name}`
                        }
                        {family.titular === "man" &&
                            `${family.man_first_name} ${family.man_second_name} ${family.man_last_name}`
                        }
                    </td>
                    <td>
                        <button type="button" className="btn btn-info mr-1 mb-1" onClick={() => { viewDetails(family.id) }}><i className="fa fa-info-circle"></i></button>
                        <button type="button" className="btn btn-warning mr-1 mb-1" onClick={() => { editFamily(family.id) }}><i className="fa fa-edit"></i></button>
                        <button type="button" className="btn btn-danger mb-1" onClick={() => { deleteFamily(family.id) }}><i className="fa fa-trash"></i></button>
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
                            <th style={{width: 75+'%'}} scope="col">Титуляр</th>
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