import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { objectIsEmpty } from '../../helpers';
import actions from '../../redux/actions';
import FamilyDetailsComponent from '../../components/Family/DetailsComponent';
import Loader from '../../components/base-components/Loader';
import BackButton from '../../components/base-components/BackButton';
import OwnChildrenListComponent from '../../components/Family/DetailsComponent/OwnChildrenListComponent';

const DetailsPage = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams(); // get parameter from url

    const family = useSelector(state => state.currentFamily);
    const currentFamilyIsLoading = useSelector(state => state.currentFamilyIsLoading);
    const familiesAreLoading = useSelector(state => state.familiesAreLoading);

    const processErrorMessages = (error) => {
        if(error.response) {
            switch(error.response.status) {
                case 401:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                    dispatch(actions.deleteLoggedUser());
                    break;
                case 404:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерено такова семейство!"}));
                    history.goBack();
                    break;
                default:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                    break;
            }
        } else {
            dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
        }
    }

    useEffect(() => {
        if((!objectIsEmpty(family) && Number(family.id) !== Number(id)) || objectIsEmpty(family)) {
            dispatch(actions.loadCurrentFamily(id))
                .catch(error => processErrorMessages(error));
        }

        // eslint-disable-next-line
    }, [family, id, dispatch]);

    const editFamily = (family) => {
        history.push(`/family/edit/${family.id}`);
    }

    const deleteFamily = () => {
        let confirm = window.confirm("Сигурни ли сте?");

        if(!confirm) {
            return null;
        }
        
        dispatch(actions.deleteFamily(family.id))
            .then(() => {
                history.push("/family/all");
            })
            .catch((error) => {
                processErrorMessages(error);
            });
    }

    return <>
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <h1>Семейство</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <h2>Детайли</h2>
                    
                    <FamilyDetailsComponent />
                </div>

                <div className="col-md">
                    <div className="row">
                        <div className="col">
                            <h2>Документи</h2>

                            <div className="list-group">
                                <button className="list-group-item list-group-item-action" onClick={() => {history.push(`/family/document/family-application/${family.id}`)}}>Заявление</button>
                            </div>
                        </div>
                    </div>
                    
                    <hr />

                    <div className="row">
                        <div className="col">
                            <h2>Деца</h2>

                            <OwnChildrenListComponent />
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col">
                    <div className="mt-4 d-flex justify-content-end">
                        <button type="button" className="btn btn-warning mr-1" onClick={() => { editFamily(family) }}>Редактирай</button>
                        <button type="button" className="btn btn-danger" onClick={() => { deleteFamily() }}>Изтрий</button>
                        <BackButton />
                    </div>
                </div>
            </div>

            {familiesAreLoading && <Loader loading={familiesAreLoading} fullScreen={true} />}
            {currentFamilyIsLoading && <Loader loading={currentFamilyIsLoading} fullScreen={true} />}
        </div>
    </>;
}

export default DetailsPage;