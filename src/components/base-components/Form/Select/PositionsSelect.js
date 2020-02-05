import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "../../../../redux/actions";
import networkClient from '../../../../network/network-client';
import Select from './Select';

const PositionsSelect = (props) => {

    const [positionsFromServer, setPositionsFromServer] = useState();

    const isLoading = useSelector(state => state.loadingPositions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setLoadingPositions(true));

        networkClient.get("/position/all", null, (positions) => {
            setPositionsFromServer(positions);
        })
        .finally(()=> {
            dispatch(actions.setLoadingPositions(false));
        });
    }, []);

    const renderPositions = () => {
        if(!positionsFromServer) return null;

        return positionsFromServer.map((position) => {
            return <option key={position.id} value={position.id}>{position.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange} loading={isLoading}>
            {renderPositions()}
        </Select>
    );

}

export default PositionsSelect;