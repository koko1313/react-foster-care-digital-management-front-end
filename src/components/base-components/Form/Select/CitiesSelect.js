import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "../../../../redux/actions";
import networkClient from '../../../../network/network-client';
import Select from './Select';

const CitiesSelect = (props) => {

    const [citiesFromServer, setCitiesFromServer] = useState();

    const isLoading = useSelector(state => state.loadingCities);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setLoadingCities(true));

        networkClient.get("/city/all", null, (cities) => {
            setCitiesFromServer(cities);
        })
        .finally(()=> {
            dispatch(actions.setLoadingCities(false));
        });
    }, []);

    const renderCities = () => {
        if(!citiesFromServer) return null;

        return citiesFromServer.map((city) => {
            return <option key={city.id} value={city.id}>{city.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} onChange={props.onChange} loading={isLoading} value={props.value}>
            {renderCities()}
        </Select>
    );

}

export default CitiesSelect;