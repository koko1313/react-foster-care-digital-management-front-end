import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "../../../../redux/actions";
import Select from './Select';
import networkClient from '../../../../network/network-client';

const SubRegionsSelect = (props) => {

    const [subRegionsFromServer, setSubRegionsFromServer] = useState();

    const isLoading = useSelector(state => state.loadingSubRegions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setLoadingSubRegions(true));

        networkClient.get("/sub-region/all", null, (regions) => {
            setSubRegionsFromServer(regions);
        })
        .finally(()=> {
            dispatch(actions.setLoadingSubRegions(false));
        });
    }, []);

    const renderSubRegions = () => {
        if(!subRegionsFromServer) return null;

        return subRegionsFromServer.map((subRegion) => {
            return <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange} loading={isLoading}>
            {renderSubRegions()}
        </Select>
    );

}

export default SubRegionsSelect;