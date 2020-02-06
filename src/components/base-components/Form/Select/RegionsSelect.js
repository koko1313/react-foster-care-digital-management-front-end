import React, { useState, useEffect } from 'react';
import Select from './Select';
import networkClient from '../../../../network/network-client';

const RegionsSelect = (props) => {

    const [regionsFromServer, setRegionsFromServer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        networkClient.get("/region/all", null, (regions) => {
            setRegionsFromServer(regions);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }, []);

    const renderRegions = () => {
        if(!regionsFromServer) return null;

        return regionsFromServer.map((region) => {
            return <option key={region.id} value={region.id}>{region.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange} loading={isLoading} value={props.value}>
            {renderRegions()}
        </Select>
    );

}

export default RegionsSelect;