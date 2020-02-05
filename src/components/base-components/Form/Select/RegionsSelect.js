import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "../../../../redux/actions";
import Select from './Select';
import networkClient from '../../../../network/network-client';

const RegionsSelect = (props) => {

    const [regionsFromServer, setRegionsFromServer] = useState();

    const isLoading = useSelector(state => state.loadingRegions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setLoadingRegions(true));

        networkClient.get("/region/all", null, (regions) => {
            setRegionsFromServer(regions);
        })
        .finally(()=> {
            dispatch(actions.setLoadingRegions(false));
        });
    }, []);

    const renderRegions = () => {
        if(!regionsFromServer) return null;

        return regionsFromServer.map((region) => {
            return <option key={region.id} value={region.id}>{region.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange} loading={isLoading}>
            {renderRegions()}
        </Select>
    );

}

export default RegionsSelect;