import React, { useEffect, useState } from 'react';
import networkClient from '../../../../network/network-client';
import Select from './Select';

const PositionsSelect = (props) => {

    const [positionsFromServer, setPositionsFromServer] = useState();

    useEffect(() => {
        networkClient.get("/position/all", null, (positions) => {
            setPositionsFromServer(positions);
        });
    }, []);

    const renderPositions = () => {
        if(!positionsFromServer) return null;

        return positionsFromServer.map((position) => {
            return <option key={position.id} value={position.id}>{position.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange}>
            {renderPositions()}
        </Select>
    );

}

export default PositionsSelect;