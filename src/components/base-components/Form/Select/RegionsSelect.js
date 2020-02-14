import React, { useState, useEffect } from 'react';
import Select from './Select';
import networkClient from '../../../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';

const RegionsSelect = (props) => {

    const regions = useSelector(state => state.regions);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(regions.length > 0) return; // if regions are already loaded from server

        setIsLoading(true);

        networkClient.get("/region/all", null, 
            (regions) => {
                dispatch(actions.setRegions(regions));
                setIsLoading(false);
            },
            () => {
                setIsLoading(false);
            }
        );
        // eslint-disable-next-line
    }, []);

    const renderRegions = () => {
        if(!regions) return null;

        return regions.map((region) => {
            return <option key={region.id} value={region.id}>{region.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} required={props.required} onChange={props.onChange} loading={isLoading} value={props.value}>
            {renderRegions()}
        </Select>
    );

}

export default RegionsSelect;