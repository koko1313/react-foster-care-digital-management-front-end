import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import Select from '../../../base-components/Form/Select/Select';
import networkClient from '../../../../network/network-client';

/**
 * @param {function} closeFunction 
 */
const AddChildToFamilyComponent = (props) => {
    const [childId, setChildId] = useState();

    // TODO - loadging bar
    const addChildToFamily = () => {

        // TODO - 12 is hardcored
        const data = {childId: 12};

        // TODO - 3 is hardcored
        networkClient.post("/family/3/add_child", data,
            // success
            (response) => {
                props.setAlert({color: "success", message: "Детето беше успешно добавено!"});
                props.closeFunction();
            },
            // error
            (error) => {
                props.setAlert({color: "danger", message: "Нещо се обърка!"});
                // processErrorMessages(error);
                // setIsLoading(false);
                props.closeFunction();
            }
        );
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Select 
                            id = "addChildToFamilySelect" 
                            label = "Добави дете" 
                            placeholder = "Избери дете ..." 
                            onChange = {(e) => setChildId(e.target.value)} 
                            value = {childId}
                        >
                            <option value="Момче">Дете 1</option>
                            <option value="Момиче">Дете 2</option>
                        </Select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="pull-right">
                            <button type="button" className="btn btn-light mx-1" onClick={props.closeFunction}>Отказ</button>
                            <button type="button" className="btn btn-primary" onClick={addChildToFamily}>Добави</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddChildToFamilyComponent;