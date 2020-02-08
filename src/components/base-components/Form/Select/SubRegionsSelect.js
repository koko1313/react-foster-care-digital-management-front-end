import React, { useState, useEffect } from 'react';
import Select from './Select';
import networkClient from '../../../../network/network-client';

const SubRegionsSelect = (props) => {

    const [subRegionsFromServer, setSubRegionsFromServer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        networkClient.get("/sub-region/all", null, (regions) => {
            setSubRegionsFromServer(regions);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }, []);

    const renderSubRegions = () => {
        if(!subRegionsFromServer) return null;

        return subRegionsFromServer.map((subRegion) => {
            return <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} required={props.required} onChange={props.onChange} loading={isLoading} value={props.value}>
            {renderSubRegions()}
        </Select>
    );

}

export default SubRegionsSelect;