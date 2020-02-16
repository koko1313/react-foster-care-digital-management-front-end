import React, { useState, useEffect } from 'react';
import Select from './Select';
import networkClient from '../../../../network/network-client';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';

const SubRegionsSelect = (props) => {

    const subRegions = useSelector(state => state.subRegions);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(subRegions.length > 0) return; // if sub regions are already loaded from the server

        setIsLoading(true);

        networkClient.get("/sub-region/all", null, 
            (subRegions) => {
                dispatch(actions.setSubRegions(subRegions));
                setIsLoading(false);
            },
            () => {
                setIsLoading(false);
            }
        );

        // eslint-disable-next-line
    }, []);

    const renderSubRegions = () => {
        if(!subRegions) return null;

        return subRegions.map((subRegion) => {
            return <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>
        });
    }

    return (
        <Select 
            id = {props.id} 
            className = {props.className}
            label = {props.label} 
            placeholder = {props.placeholder} 
            required = {props.required} 
            onChange = {props.onChange} 
            loading = {isLoading} 
            value = {props.value}
            isInvalid = {props.isInvalid}
        >
            {renderSubRegions()}
        </Select>
    );

}

export default SubRegionsSelect;