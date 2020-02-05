import React, { useState, useEffect } from 'react';
import Select from './Select';
import networkClient from '../../../../network/network-client';

const SubRegionsSelect = (props) => {

    const [subRegionsFromServer, setSubRegionsFromServer] = useState();

    useEffect(() => {
        networkClient.get("/sub-region/all", null, (regions) => {
            setSubRegionsFromServer(regions);
        });
    }, []);

    const renderSubRegions = () => {
        if(!subRegionsFromServer) return null;

        return subRegionsFromServer.map((subRegion) => {
            return <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange}>
            {renderSubRegions()}
        </Select>
    );

}

export default SubRegionsSelect;