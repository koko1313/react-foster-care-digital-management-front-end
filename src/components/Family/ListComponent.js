import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from "../../redux/actions";
import Loader from '../base-components/Loader';
import { useHistory } from 'react-router-dom';

const ListComponent = () => {

    const familiesAreLoading = useSelector(state => state.familiesAreLoading);
    const families = useSelector(state => state.families);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(actions.loadFamilies());
    }, [families, dispatch]);

    const viewDetails = (family) => {
        dispatch(actions.setCurrentFamily(family));
        history.push(`/family/details/${family.id}`);
    }

    const remountComponent = () => {
        dispatch(actions.setFamilies([]));
    }
    
    const renderFamiliesList = () => {
        if(!families) return null;

        return families.map((family) => {
            return (
                <tr key={family.id}>
                    <td>
                        {family.titular === "woman" && family.woman &&
                            `${family.woman.first_name} ${family.woman.second_name} ${family.woman.last_name}`
                        }
                        {family.titular === "man" && family.man &&
                            `${family.man.first_name} ${family.man.second_name} ${family.man.last_name}`
                        }
                    </td>
                    <td>
                        <button type="button" className="btn btn-info mr-1 mb-1" onClick={() => { viewDetails(family) }}><i className="fas fa-info-circle"></i></button>
                    </td>
                </tr>
            );
        });
    }

    return <>
        <div className="content-list d-flex flex-column">
            <div className="content-list-options d-flex justify-content-between">
                <button className="btn btn-link" onClick={()=>history.push("/family/register")}>Добави семейство</button>
                <button className="btn btn-info mb-2" onClick={remountComponent}><i className="fas fa-sync"></i></button>
            </div>
        
            <div className="content-list-results">
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
            </div>

            <Loader loading={familiesAreLoading} />
        </div>
    </>;

}

export default ListComponent;