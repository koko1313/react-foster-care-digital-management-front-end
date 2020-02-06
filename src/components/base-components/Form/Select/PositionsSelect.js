import React, { useEffect, useState } from 'react';
import networkClient from '../../../../network/network-client';
import Select from './Select';

const PositionsSelect = (props) => {

    const [positionsFromServer, setPositionsFromServer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        networkClient.get("/position/all", null, (positions) => {
            setPositionsFromServer(positions);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }, []);

    const renderPositions = () => {
        if(!positionsFromServer) return null;

        return positionsFromServer.map((position) => {
            return <option key={position.id} value={position.id}>{position.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange} loading={isLoading} value={props.value}>
            {renderPositions()}
        </Select>
    );

}

export default PositionsSelect;