import React, { useState, useEffect } from 'react';
import Select from '../../../base-components/Form/Select/Select';
import networkClient from '../../../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';

/**
 * @param {function} closeFunction 
 */
const AddChildToFamilyComponent = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [children, setChildren] = useState();
    const [childId, setChildId] = useState();

    const dispatch = useDispatch();

    const family = useSelector(state => state.currentFamily);

    useEffect(() => {
        setIsLoading(true);
        
        networkClient.get(`/child/all-free`, null, 
            (children) => {
                setChildren(children);
                setIsLoading(false);
            },
            (error) => {
                //processErrorMessages(error);
                setIsLoading(false);
            }
        );

        //eslint-disable-next-line
    }, []);

    const renderChildrenOptions = () => {
        if(!children) return;

        return children.map((child) => {
            return <option key={child.id} value={child.id}>{`[${child.egn}] ${child.first_name} ${child.last_name}`}</option>
        });
    }

    const addChildToFamily = () => {
        setIsLoading(true);

        const data = {childId: childId};

        networkClient.post(`/family/${family.id}/add_child`, data,
            // success
            (response) => {
                dispatch(actions.addChildToCurrentFamily(response));
                props.closeFunction();
                setIsLoading(false);
            },
            // error
            (error) => {
                props.setAlert({color: "danger", message: "Нещо се обърка!"});
                // processErrorMessages(error);
                props.closeFunction();
                setIsLoading(false);
            }
        );
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

            <div>
                <div className="pull-right">
                    <button type="button" className="btn btn-light mx-1" onClick={props.closeFunction}>Отказ</button>
                    <button type="button" className="btn btn-primary" onClick={addChildToFamily}>Добави дете</button>
                </div>
            </div>
        </div>
    </>;

}

export default AddChildToFamilyComponent;