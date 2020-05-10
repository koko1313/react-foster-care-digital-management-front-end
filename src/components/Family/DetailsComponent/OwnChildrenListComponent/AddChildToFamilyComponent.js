import React, { useState, useEffect } from 'react';
import Select from '../../../base-components/Form/Select/Select';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';
import { objectIsEmpty } from '../../../../helpers';

/**
 * @param {function} isLoading - the parent isLoading, so we can set it here
 * @param {function} closeFunction 
 */
const AddChildToFamilyComponent = (props) => {

    const dispatch = useDispatch();

    const family = useSelector(state => state.currentFamily);
    const childrenWithoutFamily = useSelector(state => state.children.filter(child => objectIsEmpty(child.family)));

    const [isLoading, setIsLoading] = useState(false);

    const [childId, setChildId] = useState();

    useEffect(() => {
        if(childrenWithoutFamily.length === 0) {
            setIsLoading(true);

            dispatch(actions.loadChildren())
                .finally(() => setIsLoading(false));
        }
        
        //eslint-disable-next-line
    }, []);

    const renderChildrenOptions = () => {
        if(!childrenWithoutFamily) return;

        return childrenWithoutFamily.map((child) => {
            return <option key={child.id} value={child.id}>{`[${child.egn}] ${child.first_name} ${child.last_name}`}</option>
        });
    }

    const addChildToFamily = (childId) => {
        props.setIsLoading(true);

        dispatch(actions.addChildToFamily(family.id, childId))
            .then(() => {
                props.closeFunction();
            })
            .catch((error) => {
                // processErrorMessages(error);
                props.setAlert({color: "danger", message: "Нещо се обърка!"});
            })
            .finally(() => {
                props.setIsLoading(false);
            });
    }

    return <>
        <div className="d-flex flex-column">
            <Select 
                id = "addChildToFamilySelect" 
                label = "Добави дете" 
                placeholder = "Избери дете ..." 
                onChange = {(e) => setChildId(e.target.value)} 
                value = {childId}
                loading = {isLoading}
            >
                {renderChildrenOptions()}
            </Select>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-light mx-1" onClick={props.closeFunction}>Отказ</button>
                <button type="button" className="btn btn-primary" onClick={() => addChildToFamily(childId)}>Добави дете</button>
            </div>
        </div>
    </>;

}

export default AddChildToFamilyComponent;